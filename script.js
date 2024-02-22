const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const sheetContent = bottomSheet.querySelector(".content");
const dragIcon = bottomSheet.querySelector(".drag-icon");

let isDragging = false,
  startY,
  startHeight;

function showBottomSheet() {
  bottomSheet.classList.add("show");
  updateSheetHeight(50);
}

function hideBottomSheet() {
  bottomSheet.classList.remove("show");
}

function updateSheetHeight(height) {
  sheetContent.style.height = `${height}vh`;
}

function dragStart(e) {
  isDragging = true;
  startY = e.pageY;
  startHeight = parseInt(sheetContent.style.height);
  bottomSheet.classList.add("dragging");
}

function dragging(e) {
  if (!dragging) return;
  const delta = startY - e.pageY;
  const newHeight = startHeight + (delta / window.innerHeight) * 100;

  updateSheetHeight(newHeight);
}

function dragStop() {
  isDragging = false;
  bottomSheet.classList.remove("dragging");
  const sheetHeight = parseInt(sheetContent.style.height);

  sheetHeight < 25
    ? hideBottomSheet()
    : sheetHeight > 75
    ? updateSheetHeight(100)
    : updateSheetHeight(50);
}

document.addEventListener("mouseup", dragStop);
dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);

showModalBtn.addEventListener("click", showBottomSheet);
sheetOverlay.addEventListener("click", hideBottomSheet);
