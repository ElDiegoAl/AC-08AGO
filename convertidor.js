const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const shapeSelect = document.getElementById('shape');
        const clearButton = document.getElementById('clear');

        const scaleXInput = document.getElementById('scaleX');
        const scaleYInput = document.getElementById('scaleY');
        const applyScaleButton = document.getElementById('applyScale');

        const translateXInput = document.getElementById('translateX');
        const translateYInput = document.getElementById('translateY');
        const applyTranslationButton = document.getElementById('applyTranslation');

        const rotationInput = document.getElementById('rotation');
        const applyRotationButton = document.getElementById('applyRotation');

        let currentShape = 'rectangle';
        let shapes = [];
        let selectedShapeIndex = null;

        shapeSelect.addEventListener('change', (e) => {
            currentShape = e.target.value;
        });

        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            let shape;
            if (currentShape === 'rectangle') {
                shape = { type: 'rectangle', x, y, width: 100, height: 50, angle: 0 };
            } else if (currentShape === 'circle') {
                shape = { type: 'circle', x, y, radius: 50, angle: 0 };
            }
            shapes.push(shape);
            drawShapes();
        });

        function drawShapes() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            shapes.forEach((shape, index) => {
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

        canvas.addEventListener('dblclick', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            selectedShapeIndex = shapes.findIndex((shape) => {
                if (shape.type === 'rectangle') {
                    return (
                        x >= shape.x - shape.width / 2 &&
                        x <= shape.x + shape.width / 2 &&
                        y >= shape.y - shape.height / 2 &&
                        y <= shape.y + shape.height / 2
                    );
                } else if (shape.type === 'circle') {
                    return Math.hypot(x - shape.x, y - shape.y) <= shape.radius;
                }
            });

            if (selectedShapeIndex !== -1) {
                drawShapes();
            }
        });

        applyScaleButton.addEventListener('click', () => {
            if (selectedShapeIndex !== null) {
                const shape = shapes[selectedShapeIndex];
                shape.width *= parseFloat(scaleXInput.value);
                shape.height *= parseFloat(scaleYInput.value);
                shape.radius *= parseFloat(scaleXInput.value); 
                drawShapes();
            }
        });

        applyTranslationButton.addEventListener('click', () => {
            if (selectedShapeIndex !== null) {
                const shape = shapes[selectedShapeIndex];
                shape.x += parseFloat(translateXInput.value);
                shape.y += parseFloat(translateYInput.value);
                drawShapes();
            }
        });

        applyRotationButton.addEventListener('click', () => {
            if (selectedShapeIndex !== null) {
                const shape = shapes[selectedShapeIndex];
                shape.angle = (shape.angle || 0) + parseFloat(rotationInput.value);
                drawShapes();
            }
        });
    