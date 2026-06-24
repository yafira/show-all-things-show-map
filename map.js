var IMG_W = 2400,
  IMG_H = 1248;
var currentScale = 1;
var mapContainer = document.getElementById("mapContainer");
var mapInner = document.getElementById("mapInner");
var spotsLayer = document.getElementById("spots-layer");

// ── Pan (mouse) ───────────────────────────────────────────────────────────────
var isPanning = false,
  panSX,
  panSY,
  panSL,
  panST;

mapContainer.addEventListener("mousedown", function (e) {
  isPanning = true;
  panSX = e.pageX - mapContainer.offsetLeft;
  panSY = e.pageY - mapContainer.offsetTop;
  panSL = mapContainer.scrollLeft;
  panST = mapContainer.scrollTop;
});
mapContainer.addEventListener("mousemove", function (e) {
  if (!isPanning) return;
  e.preventDefault();
  mapContainer.scrollLeft = panSL - (e.pageX - mapContainer.offsetLeft - panSX);
  mapContainer.scrollTop = panST - (e.pageY - mapContainer.offsetTop - panSY);
});
mapContainer.addEventListener("mouseup", function () {
  isPanning = false;
});
mapContainer.addEventListener("mouseleave", function () {
  isPanning = false;
});

// ── Touch: pan + pinch-to-zoom ────────────────────────────────────────────────
var lastTouchDist = null;
var touchStartX, touchStartY, touchScrollL, touchScrollT;

function getTouchDist(e) {
  var dx = e.touches[0].clientX - e.touches[1].clientX;
  var dy = e.touches[0].clientY - e.touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

mapContainer.addEventListener(
  "touchstart",
  function (e) {
    if (e.touches.length === 2) {
      lastTouchDist = getTouchDist(e);
    } else if (e.touches.length === 1) {
      lastTouchDist = null;
      touchStartX = e.touches[0].pageX - mapContainer.offsetLeft;
      touchStartY = e.touches[0].pageY - mapContainer.offsetTop;
      touchScrollL = mapContainer.scrollLeft;
      touchScrollT = mapContainer.scrollTop;
    }
  },
  { passive: true },
);

mapContainer.addEventListener(
  "touchmove",
  function (e) {
    if (e.touches.length === 2) {
      // Pinch zoom
      var dist = getTouchDist(e);
      if (lastTouchDist) {
        var factor = dist / lastTouchDist;
        currentScale = Math.min(Math.max(currentScale * factor, 0.3), 6);
        mapInner.style.transform = "scale(" + currentScale + ")";
      }
      lastTouchDist = dist;
    } else if (e.touches.length === 1 && lastTouchDist === null) {
      // Single-finger pan
      var x = e.touches[0].pageX - mapContainer.offsetLeft;
      var y = e.touches[0].pageY - mapContainer.offsetTop;
      mapContainer.scrollLeft = touchScrollL - (x - touchStartX);
      mapContainer.scrollTop = touchScrollT - (y - touchStartY);
    }
  },
  { passive: true },
);

mapContainer.addEventListener(
  "touchend",
  function () {
    lastTouchDist = null;
  },
  { passive: true },
);

// ── Spots ─────────────────────────────────────────────────────────────────────
function imgDims() {
  var i = document.getElementById("mapImg");
  return { w: i.offsetWidth, h: i.offsetHeight };
}

function buildSpots() {
  spotsLayer.innerHTML = "";
  var d = imgDims(),
    sx = d.w / IMG_W,
    sy = d.h / IMG_H;
  window.SPOTS.forEach(function (s) {
    var el = document.createElement("div");
    el.className = "spot";
    el.id = "spot-" + s.id;
    el.style.left = Math.round(s.x * sx) + "px";
    el.style.top = Math.round(s.y * sy) + "px";
    spotsLayer.appendChild(el);
  });
}

// ── Search ────────────────────────────────────────────────────────────────────
function doSearch(q) {
  q = q.toLowerCase().trim();
  var banner = document.getElementById("resultBanner");
  var hint = document.getElementById("hint");
  var clearBtn = document.getElementById("clearBtn");

  clearBtn.classList.toggle("show", q.length > 0);

  if (!q) {
    document.querySelectorAll(".spot").forEach(function (el) {
      el.className = "spot";
    });
    banner.className = "result-banner";
    banner.innerHTML = "";
    hint.style.display = "block";
    return;
  }

  hint.style.display = "none";

  var matchedSpotIds = {};
  var matchedEntries = [];

  Object.keys(window.FINAL_MAP).forEach(function (spotId) {
    var data = window.FINAL_MAP[spotId];
    data.entries.forEach(function (e, idx) {
      if (
        e.name.toLowerCase().includes(q) ||
        e.project.toLowerCase().includes(q)
      ) {
        matchedSpotIds[spotId] = true;
        var subLabel =
          data.entries.length > 1 ? spotId + "." + (idx + 1) : spotId;
        var key = e.name + "|||" + e.project;
        if (
          !matchedEntries.find(function (x) {
            return x.key === key;
          })
        ) {
          matchedEntries.push({
            key: key,
            name: e.name,
            project: e.project,
            zone: data.zone,
            spotId: parseInt(spotId),
            label: subLabel,
            totalInSpot: data.entries.length,
          });
        }
      }
    });
  });

  document.querySelectorAll(".spot").forEach(function (el) {
    var id = el.id.replace("spot-", "");
    el.className = matchedSpotIds[id] ? "spot active" : "spot";
  });

  banner.innerHTML = "";

  if (matchedEntries.length === 0) {
    banner.className = "result-banner show";
    var msg = document.createElement("div");
    msg.className = "result-no";
    msg.textContent = 'No match for "' + q + '" — try a different spelling.';
    banner.appendChild(msg);
    return;
  }

  banner.className = "result-banner show";
  matchedEntries.forEach(function (e) {
    var card = document.createElement("div");
    card.className = "result-card";

    var nameEl = document.createElement("div");
    nameEl.className = "result-name";
    nameEl.textContent = e.name;

    var projEl = document.createElement("div");
    projEl.className = "result-project";
    projEl.textContent = e.project;

    var locEl = document.createElement("div");
    locEl.className = "result-location";
    var spotLabel = "Spot " + e.label + (e.totalInSpot > 1 ? " (shared)" : "");
    locEl.textContent = spotLabel + " \u00b7 " + e.zone;

    card.appendChild(nameEl);
    if (e.project) card.appendChild(projEl);
    card.appendChild(locEl);
    banner.appendChild(card);
  });

  // Scroll map to first matched spot
  var firstId = Object.keys(matchedSpotIds)[0];
  var spot = window.SPOTS.find(function (s) {
    return s.id === parseInt(firstId);
  });
  if (spot) {
    var d = imgDims();
    var px = spot.x * (d.w / IMG_W) * currentScale;
    var py = spot.y * (d.h / IMG_H) * currentScale;
    mapContainer.scrollTo({
      left: px - mapContainer.clientWidth / 2,
      top: py - mapContainer.clientHeight / 2,
      behavior: "smooth",
    });
  }
}

function clearSearch() {
  document.getElementById("search").value = "";
  doSearch("");
  document.getElementById("search").focus();
}

document.getElementById("search").addEventListener("input", function () {
  doSearch(this.value);
});

// ── Zoom buttons ──────────────────────────────────────────────────────────────
function zoom(f) {
  currentScale = Math.min(Math.max(currentScale * f, 0.3), 6);
  mapInner.style.transform = "scale(" + currentScale + ")";
}
function resetZoom() {
  currentScale = 1;
  mapInner.style.transform = "scale(1)";
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.getElementById("mapImg").addEventListener("load", function () {
  buildSpots();
  // On mobile, start zoomed out a bit so the map is visible
  if (window.innerWidth < 600) {
    currentScale = 0.45;
    mapInner.style.transform = "scale(" + currentScale + ")";
  }
});
document.getElementById("mapImg").src = window.MAP_IMG_SRC;
