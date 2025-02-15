import { useState, useRef, useEffect } from "react";
import { Participant } from "../types/Participant";

type WheelProps = {
  participants: Participant[];
};

const Wheel = ({ participants }: WheelProps) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [spinDirection, setSpinDirection] = useState<
    "clockwise" | "counterclockwise"
  >("clockwise");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const numSectors = participants.length;

  useEffect(() => {
    if (canvasRef.current) {
      drawWheel();
    }
  }, [participants, rotation]);

  // obtener los colores de los sectores
  const darkenColor = (color: string, amount: number): string => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  // dibujar la ruleta
  const drawWheel = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const radius = canvas.width / 2;
    const sliceAngle = (2 * Math.PI) / numSectors;
    const colors = ["#f39c12", "#e74c3c", "#3498db", "#2ecc71"];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(radius, radius);
    ctx.rotate(-rotation * (Math.PI / 180));

    // dibujar los sectores
    for (let i = 0; i < numSectors; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = (i + 1) * sliceAngle;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      const color = darkenColor(colors[i % colors.length], 30);
      ctx.fillStyle = color;
      ctx.fill();

      // dibujar el texto
      ctx.save();
      ctx.rotate((startAngle + endAngle) / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.shadowBlur = 3;
      ctx.fillText(participants[i].name || "", radius * 0.5, 0);
      ctx.restore();
    }

    ctx.rotate(rotation * (Math.PI / 180));
    ctx.translate(-radius, -radius);

    // dibujar el indicador
    const indicatorLength = 20;
    const indicatorWidth = 10;
    ctx.save();
    ctx.translate(canvas.width, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(-indicatorLength, -indicatorWidth / 2);
    ctx.lineTo(0, -indicatorWidth / 2);
    ctx.lineTo(0, indicatorWidth / 2);
    ctx.lineTo(-indicatorLength, indicatorWidth / 2);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
  };

  // girar la ruleta
  const startSpin = () => {
    if (spinning) return;
    setSpinning(true);

    const numFullRotations = Math.random() * 5 + 5;
    const totalRotation = numFullRotations * 360;
    const finalRotation =
      (rotation +
        (spinDirection === "clockwise" ? -totalRotation : totalRotation)) %
      360;

    const spinDuration = 6000;
    const easing = (t: number) => {
      return 1 - Math.pow(1 - t, 3);
    };

    let startTime: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const t = Math.min(elapsed / spinDuration, 1);
      const easeT = easing(t);
      const currentRotation =
        rotation +
        (spinDirection === "clockwise" ? -totalRotation : totalRotation) *
          easeT;

      setRotation(currentRotation);

      if (elapsed < spinDuration) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const winner = determineWinner(finalRotation);
        alert(`The winner is: ${winner.name}`);
      }
    };

    requestAnimationFrame(animate);
  };

  // obtener el ganador
  const determineWinner = (finalRotation: number) => {
    const sliceAngle = 360 / numSectors;
    const normalizedRotation = ((finalRotation % 360) + 360) % 360;
    const winningSector = Math.floor(normalizedRotation / sliceAngle);

    return participants[winningSector];
  };

  return (
    <div className="wheel">
      <canvas ref={canvasRef} width={300} height={300} />
      <button onClick={startSpin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin!"}
      </button>
      <button
        onClick={() =>
          setSpinDirection(
            spinDirection === "clockwise" ? "counterclockwise" : "clockwise"
          )
        }
        disabled={spinning}
      >
        {spinDirection}
      </button>
    </div>
  );
};

export default Wheel;
