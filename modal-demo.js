const randomId = Date.now();

const styles = `
    .modal-${randomId}.show {
      opacity: 1;
      visibility: visible;
    }
    .modal-${randomId} {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100vh;
      top: 0;
      left: 0;
      opacity: 0;
      visibility: hidden;
      transition: 250ms;
    }
    .modal-${randomId} .modal-backdrop{
      background: rgba(0,0,0,0.5);
      z-index: 99999;
      width: 100%;
      height: 100%;
    }
    .modal-${randomId} .modal-dialog {
      max-width: 500px;
      position: absolute;
      width: 100%;
      z-index: 999999;
    }

    .modal-${randomId} .modal-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      pointer-events: auto;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid rgba(0,0,0,.2);
      border-radius: 0.3rem;
      outline: 0;
    }

    .modal-${randomId} .modal-header {
      display: flex;
      align-items: flex-start;
      -webkit-box-pack: justify;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
    }
    .modal-${randomId} h5 {
      margin: 0
    }
    .modal-${randomId} .modal-body {
      position: relative;
      -webkit-box-flex: 1;
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
      padding: 1rem;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

document.getElementsByTagName("body")[0].innerHTML += `
<div class="modal-${randomId}" tabindex="-1" role="dialog" onclick="event.cancelBubble = true">
  <div class="modal-backdrop"></div>  
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
    </div>
  </div>
</div>`;

function hideModal() {
  document.querySelector(`.modal-${randomId}`).classList.remove("show");
}

function showModal() {
  document.querySelector(`.modal-${randomId}`).classList.add("show");
}

// trigger only for the very first time
function main() {
  document
    .querySelector(`.modal-${randomId} .modal-backdrop`)
    .addEventListener("click", function () {
      hideModal();
    });

  document
    .querySelector(`.modal-${randomId} button.close`)
    .addEventListener("click", function () {
      hideModal();
    });

  const modalCountLocalStorageKey = "modalCount";

  const modalOpenCount = localStorage.getItem(modalCountLocalStorageKey) ?? 0;
  if (modalOpenCount === 0) {
    showModal();
    localStorage.setItem(modalCountLocalStorageKey, 1);
  }
}


main()