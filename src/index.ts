const templateString = `
  <style>
a {
  background: #000;
  color: #fff;
  text-decoration: none;
  font-family: arial, sans-serif;
  text-align: center;
  font-weight: bold;
  padding: 5px 40px;
  font-size: 1rem;
  line-height: 2rem;
  position: relative;
  transition: 0.5s;
}
#env-label a:hover {
  background: #c11;
  color: #fff;
}
#env-label a::before,
#env-label a::after {
  content: "";
  width: 100%;
  display: block;
  position: absolute;
  top: 1px;
  left: 0;
  height: 1px;
  background: #fff;
}
#env-label a::after {
  bottom: 1px;
  top: auto;
}
@media screen and (min-width: 800px) {
  #env-label {
    position: fixed;
    display: block;
    top: 0;
    right: 0;
    width: 200px;
    overflow: hidden;
    height: 200px;
    z-index: 9999;
  }
  #env-label a {
    width: 200px;
    position: absolute;
    top: 60px;
    right: -60px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.8);
  }
}
</style>
  <span id="env-label">
    <a href="#"></a>
  </span>
`

const showLabel = (): void => {
  const template = document.createElement('template');
  template.innerHTML = templateString.trim();

  const a = template.content.querySelector('a');
  if (a) {
    a.innerText = window.location.hostname;
  }

  const clone = document.importNode(template.content, true);
  document.body.appendChild(clone);
};

export const init = (): void => {
  if (!('content' in document.createElement('template'))) {
    console.log('This browser does not support HTML template tag.');
    return;
  }

  if (document.readyState === 'complete') {
    showLabel();
  } else {
    document.addEventListener("DOMContentLoaded", showLabel);
  }
};
