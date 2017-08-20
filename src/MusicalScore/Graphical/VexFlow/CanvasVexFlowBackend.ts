import Vex = require("vexflow");

import {VexFlowBackend} from "./VexFlowBackend";
import {FontStyles} from "../../../Common/Enums/FontStyles";
import {Fonts} from "../../../Common/Enums/Fonts";
import {RectangleF2D} from "../../../Common/DataObjects/RectangleF2D";
import {PointF2D} from "../../../Common/DataObjects/PointF2D";
import {VexFlowConverter} from "./VexFlowConverter";

export class CanvasVexFlowBackend extends VexFlowBackend {

    public getBackendType(): number {
        return Vex.Flow.Renderer.Backends.CANVAS;
    }

    public initialize(container: HTMLElement): void {
        this.canvas = document.createElement("canvas");
        this.inner = document.createElement("div");
        this.inner.style.position = "relative";
        this.canvas.style.zIndex = "0";
        this.inner.appendChild(this.canvas);
        container.appendChild(this.inner);
        this.renderer = new Vex.Flow.Renderer(this.canvas, this.getBackendType());
        this.ctx = this.renderer.getContext();
        this.canvasRenderingCtx = (this.ctx as any).vexFlowCanvasContext;

    }

    public translate(x: number, y: number): void {
        this.canvasRenderingCtx.translate(x, y);
    }
    public renderText(fontHeight: number, fontStyle: FontStyles, font: Fonts, text: string,
                      heightInPixel: number, screenPosition: PointF2D): void  {
        let old: string = this.canvasRenderingCtx.font;
        this.canvasRenderingCtx.font = VexFlowConverter.font(
            fontHeight,
            fontStyle,
            font
        );
        this.canvasRenderingCtx.fillText(text, screenPosition.x, screenPosition.y + heightInPixel);
        this.canvasRenderingCtx.font = old;
    }
    public renderRectangle(rectangle: RectangleF2D, styleId: number): void {
        let old: string | CanvasGradient | CanvasPattern = this.canvasRenderingCtx.fillStyle;
        this.canvasRenderingCtx.fillStyle = VexFlowConverter.style(styleId);
        this.ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        this.canvasRenderingCtx.fillStyle = old;
    }

    private canvasRenderingCtx: CanvasRenderingContext2D;
}
