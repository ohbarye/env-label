export default class EnvLabelView {
  constructor(private labelText: string, private labelColor: string) {}

  public toHTML(): string {
    return `
      <style>
        a {
          background: ${this.labelColor};
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
          background: rgba(0,0,0,0);
          color: rgba(0,0,0,0);
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
      <span id="env-label" onclick="this.remove()">
        <a href="#">${this.labelText}</a>
      </span>
    `.trim();
  }
}
