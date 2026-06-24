var IMG_W = 2400,
  IMG_H = 1248;
var currentScale = 1;
var isPanning = false,
  panSX,
  panSY,
  panSL,
  panST;
var mapContainer = document.getElementById("mapContainer");
var mapInner = document.getElementById("mapInner");
var spotsLayer = document.getElementById("spots-layer");

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

  // Find all matching spot entries
  var matchedSpotIds = {}; // spotId -> true
  var matchedEntries = []; // {name, project, zone, label, subLabel}

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

  // Update spot visuals
  document.querySelectorAll(".spot").forEach(function (el) {
    var id = el.id.replace("spot-", "");
    el.className = matchedSpotIds[id] ? "spot active" : "spot";
  });

  // Build result banner
  banner.innerHTML = "";

  if (matchedEntries.length === 0) {
    banner.className = "result-banner show";
    var msg = document.createElement("div");
    msg.className = "result-no";
    msg.textContent =
      'No match found for "' + q + '" — try a different spelling.';
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

    // Show "Spot 63 (Phone Booth) · North Lodge" style
    var spotLabel = "Spot " + e.label;
    if (e.totalInSpot > 1) {
      // shared spot — note it
      spotLabel += " (shared)";
    }
    locEl.textContent = spotLabel + "  \u00b7  " + e.zone;

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

function zoom(f) {
  currentScale = Math.min(Math.max(currentScale * f, 0.3), 5);
  mapInner.style.transform = "scale(" + currentScale + ")";
}

function resetZoom() {
  currentScale = 1;
  mapInner.style.transform = "scale(1)";
}

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

document.getElementById("mapImg").addEventListener("load", buildSpots);
document.getElementById("mapImg").src = window.MAP_IMG_SRC;
