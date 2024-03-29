// TODO: write code here

const fileEl = document.querySelector('.overlapped');
const overlapEl = document.querySelector('.overlap');
const previewEl = document.querySelector('[data-id=preview]');
const textPreviewEl = document.querySelector('[data-id=text-preview]');

overlapEl.addEventListener('click', () => {
  fileEl.dispatchEvent(new MouseEvent('click'));
});

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', (evt) => {
      resolve(evt.target.result);
    });
    reader.addEventListener('error', (evt) => {
      reject(evt.target.error);
    });
    reader.readAsText(file);
  });
}

fileEl.addEventListener('change', (evt) => {
  const files = Array.from(evt.currentTarget.files);

  const file = files[0];

  if (file.type.startsWith('image/')) {
    previewEl.src = URL.createObjectURL(file);
    previewEl.addEventListener('load', () => {
      URL.revokeObjectURL(previewEl.src);
    });

    const a = document.createElement('a');
    a.download = file.name;
    a.href = URL.createObjectURL(file);
    a.rel = 'noopener';
    // setTimeout(() => URL.revokeObjectURL(a.href), 60000);
    // setTimeout(() => a.dispatchEvent(new MouseEvent('click')));
  } else if (file.type.startsWith('text/')) {
    readFile(file).then(data => textPreviewEl.value = data);
  }
});

const dropEl = document.querySelector('[data-id=drop-area]');

dropEl.addEventListener('dragover', (evt) => {
  evt.preventDefault(); // разрешает сброс объекта
});

dropEl.addEventListener('drop', (evt) => {
  evt.preventDefault(); // предотвращает открытие объекта вместо нашей страницы
});

let draggedEl = null;
let ghostEl = null;
const itemsEl = document.querySelector('.items');
itemsEl.addEventListener('mousedown', (evt) => {
  evt.preventDefault();
  if (!evt.target.classList.contains('items-item')) {
    return;
  }
  draggedEl = evt.target;
  ghostEl = evt.target.cloneNode(true);
  ghostEl.classList.add('dragged');
  document.body.appendChild(ghostEl);
  ghostEl.style.left = `${evt.pageX - ghostEl.offsetWidth / 2}px`;
  ghostEl.style.top = `${evt.pageY - ghostEl.offsetHeight / 2}px`;
});
itemsEl.addEventListener('mousemove', (evt) => {
  evt.preventDefault();
  if (!draggedEl) {
    return;
  }

  ghostEl.style.left = `${evt.pageX - ghostEl.offsetWidth / 2}px`;
  ghostEl.style.top = `${evt.pageY - ghostEl.offsetHeight / 2}px`;
});
itemsEl.addEventListener('mouseleave', () => {
  if (!draggedEl) {
    return;
  }
  document.body.removeChild(ghostEl);
  ghostEl = null;
  draggedEl = null;
});
itemsEl.addEventListener('mouseup', (evt) => {
  if (!draggedEl) {
    return;
  }
  const closest = document.elementFromPoint(evt.clientX, evt.clientY);

  const { top } = closest.getBoundingClientRect();
  if (evt.pageY > window.scrollY + top + closest.offsetHeight / 2) {
    evt.currentTarget.insertBefore(draggedEl, closest.nextElementSibling);
  } else {
    evt.currentTarget.insertBefore(draggedEl, closest);
  }

  document.body.removeChild(ghostEl);
  ghostEl = null;
  draggedEl = null;
});
