var start = document.querySelector("#startGame");
    var ok = document.querySelector("#ok");
    var window1 = document.querySelector("#background");
    
    document.getElementById('startGame').addEventListener('click', () => {
    			const fileInput = document.getElementById('uploadImage');
    			if (fileInput.files.length === 0) {
    				start.addEventListener("click", () => {
    					window1.style.display = "flex";
    				})
    				ok.addEventListener("click", () => {
    					window1.style.display = "none";
    				})
    				return;
    			}

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const imageSrc = e.target.result;
        createPuzzle(imageSrc);
    };

    reader.readAsDataURL(file);
});

function createPuzzle(imageSrc) {
    const puzzleContainer = document.getElementById('puzzleContainer');
    puzzleContainer.innerHTML = '';

    let pieces = [];
    const size = 500;
    const pieceSize = size / 5;

    // Generate pieces and random positions
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzlePiece');
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
            pieces.push(piece);
        }
    }

    // Shuffle pieces
    pieces = pieces.sort(() => Math.random() - 0.5);

    // Add pieces to the container
    pieces.forEach(piece => {
        puzzleContainer.appendChild(piece);
    });

    // Add click event to swap pieces
    let firstPiece = null;

    pieces.forEach(piece => {
        piece.addEventListener('click', () => {
            if (!firstPiece) {
                firstPiece = piece;
                piece.style.border = '2px solid #fff';
            } else {
                const firstPieceStyle = firstPiece.style.backgroundPosition;
                firstPiece.style.backgroundPosition = piece.style.backgroundPosition;
                piece.style.backgroundPosition = firstPieceStyle;
                firstPiece.style.border = '0px solid transparent';
                firstPiece = null;
            }
        });
    });
}
