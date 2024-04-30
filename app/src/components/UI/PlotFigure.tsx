import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";
import { useResizeDetector } from "react-resize-detector";
import * as d3 from "d3";

type Props = {
  options: Plot.PlotOptions;
  fit?: boolean;
  style?: React.CSSProperties;
  transform?: <T extends d3.Selection<SVGSVGElement, unknown, null, undefined>>(elt: T) => void;
};

const PlotFigure: FC<Props> = ({ options: options_, style, fit, transform }) => {
  const { ref, width, height } = useResizeDetector();
  const options = useMemo(
    () => ({
      ...options_,
      width: fit ? options_.width ?? width : options_.width,
      height: fit ? options_.height ?? height : options_.height,
    }),
    [options_, width, height, fit],
  );

  useEffect(() => {
    let plot = Plot.plot(options);
    const element = ref.current;
    if (element) {
      const child = element.children[0];
      if (child) {
        child.remove();
      }
      if (transform) {
        transform(d3.select(plot));
      }
      element.appendChild(plot);
    }
  }, [ref, options, width, height, transform]);

  return (
    <div
      key={JSON.stringify({
        options_,
      })}
      style={style}
      ref={ref}
    />
  );
};

export default PlotFigure;
