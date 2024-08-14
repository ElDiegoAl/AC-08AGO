const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const shapeSelect = document.getElementById('shape');
        const clearButton = document.getElementById('clear');

        const scaleXInput = document.getElementById('scaleX');
        const scaleYInput = document.getElementById('scaleY');
        const translateXInput = document.getElementById('translateX');
        const translateYInput = document.getElementById('translateY');
        const rotationInput = document.getElementById('rotation');

        let currentShape = 'rectangle';
        let shapes = [];

        shapeSelect.addEventListener('change', (e) => {
            currentShape = e.target.value;
        });

        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            let shape;
            const scaleX = parseFloat(scaleXInput.value);
            const scaleY = parseFloat(scaleYInput.value);
            const translateX = parseFloat(translateXInput.value);
            const translateY = parseFloat(translateYInput.value);
            const rotation = parseFloat(rotationInput.value);

            if (currentShape === 'rectangle') {
                shape = {
                    type: 'rectangle',
                    x: x + translateX,
                    y: y + translateY,
                    width: 100 * scaleX,
                    height: 50 * scaleY,
                    angle: rotation
                };
            } else if (currentShape === 'circle') {
                shape = {
                    type: 'circle',
                    x: x + translateX,
                    y: y + translateY,
                    radius: 50 * scaleX,
                    angle: rotation
                };
            }
            shapes.push(shape);
            drawShapes();
        });

        function drawShapes() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            shapes.forEach((shape) => {
                ctx.save();
                ctx.translate(shape.x, shape.y);
                ctx.rotate((shape.angle || 0) * Math.PI / 180);

                ctx.beginPath();
                if (shape.type === 'rectangle') {
                    ctx.rect(-shape.width / 2, -shape.height / 2, shape.width, shape.height);
                } else if (shape.type === 'circle') {
                    ctx.arc(0, 0, shape.radius, 0, Math.PI * 2);
                }
                ctx.fillStyle = 'rgba(0, 100, 255, 0.3)';
                ctx.fill();
                ctx.strokeStyle = 'black';
                ctx.stroke();
                ctx.restore();
            });
        }

        clearButton.addEventListener('click', () => {
            shapes = [];
            drawShapes();
        });