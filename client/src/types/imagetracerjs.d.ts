declare module 'imagetracerjs' {
  export interface Options {
    ltres?: number;
    qtres?: number;
    pathomit?: number;
    rightangleenhance?: boolean;
    colorsampling?: number; // 0: disabled, 1: random, 2: deterministic
    numberofcolors?: number;
    mincolorratio?: number;
    colorquantcycles?: number;
    layering?: number;
    strokewidth?: number;
    linefilter?: boolean;
    scale?: number;
    roundcoords?: number;
    viewbox?: boolean;
    desc?: boolean;
    lcpr?: number;
    qcpr?: number;
    blurradius?: number;
    blurdelta?: number;
  }

  export function imageToSVG(
    url: string, 
    callback: (svgstr: string) => void, 
    options?: Options
  ): void;
}
