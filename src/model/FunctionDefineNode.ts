import type { Node } from "./Node";

export class FunctionDefineNode implements Node {

    name: string;
    parameters: Array<string>;
    body: Node;

    constructor(name: string, parameters: Array<string>, body: Node) {
        this.name = name;
        this.parameters = parameters;
        this.body = body;
    }


    draw(g: CanvasRenderingContext2D): void {
        const lineHeight = 10;

        let parameterBaseRadius = 0;
        if (this.name.length <= 2) {
            g.save();
            g.textAlign = "center";
            g.textBaseline = "middle";
            g.fillText(this.name, 0, 0);
            g.restore();
            parameterBaseRadius = 32;
        } else {
            parameterBaseRadius = drawCircleText(g, "-" + this.name).radius;
        }

        let bodyBaseRadius = 0;
        if (this.parameters.length * lineHeight <= parameterBaseRadius * 2 * Math.PI) {
            bodyBaseRadius = drawCircleText(g, this.parameters.join("-"), parameterBaseRadius).radius;
        } else {
            g.save();
            g.textAlign = "left";
            g.textBaseline = "middle";
            g.font = "10px Consolas";
            for (let i = 0; i < this.parameters.length; i++) {
                g.save();
                g.rotate(i / this.parameters.length * 2 * Math.PI);
                g.fillText(this.parameters[i], parameterBaseRadius, 0);
                g.restore();
            }
            g.restore();
        }

    }

}

function drawCircleText(g: CanvasRenderingContext2D, text: string, radius?: number, startAngle: number = 0): { radius: number, angle: number } {
    const lineHeight = 10;
    // 圆周周长，不指定半径的话，就按文字长度来
    let roundLength = (radius == undefined ? g.measureText(text).width : 2 * Math.PI * radius) * 1.2;
    let baselineRadius = roundLength / (2 * Math.PI);
    g.save();
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    g.font = "10px Consolas";
    let angle = startAngle;
    for (const ch of text) {
        if ((startAngle + angle + 0.05 * Math.PI) >= 2 * Math.PI) {
            g.save();
            g.rotate(angle + (startAngle - angle) / 2);
            g.moveTo(0, baselineRadius);
            g.lineTo(0, baselineRadius + 1.2 * lineHeight);
            g.stroke();
            g.restore();

            angle = startAngle;
            baselineRadius = radius + lineHeight;
            roundLength = 2 * Math.PI * baselineRadius;
        }

        const chWidth = g.measureText(ch).width;
        const deltaAngle = (chWidth / roundLength) * (2 * Math.PI);

        g.save();
        g.rotate(angle + deltaAngle / 2);
        g.fillText(ch, 0, -baselineRadius);
        g.restore();

        angle += deltaAngle;
    }
    g.restore();

    return { radius: baselineRadius + lineHeight, angle };
}