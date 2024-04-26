import React from "react";

const Loader: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"

      style={{ shapeRendering: "auto", display: 'block', background: 'transparent',maxHeight:"30px" }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <circle cx={84} cy={50} r={10} fill="#6a6a6a">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="0.25s"
            calcMode="spline"
            keyTimes="0;1"
            values="10;0"
            keySplines="0 0.5 0.5 1"
            begin="0s"
          ></animate>
          <animate
            attributeName="fill"
            repeatCount="indefinite"
            dur="1s"
            calcMode="discrete"
            keyTimes="0;0.25;0.5;0.75;1"
            values="#6a6a6a;#e2e2e2;#bdbdbd;#979797;#6a6a6a"
            begin="0s"
          ></animate>
        </circle>
        <circle cx={16} cy={50} r={10} fill="#6a6a6a">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          ></animate>
        </circle>
        <circle cx={50} cy={50} r={10} fill="#979797">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.25s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.25s"
          ></animate>
        </circle>
        <circle cx={84} cy={50} r={10} fill="#bdbdbd">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.5s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.5s"
          ></animate>
        </circle>
        <circle cx={16} cy={50} r={10} fill="#e2e2e2">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.75s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.75s"
          ></animate>
        </circle>
        <g></g>
      </g>
    </svg>
  );
};

export default Loader;
