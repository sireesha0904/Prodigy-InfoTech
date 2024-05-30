document.addEventListener("DOMContentLoaded", () => {
    const headline = document.getElementById("headline");
    const text = "A Web Developer";
    const speed = 100;
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            let char = text.charAt(index);
            if (char === " ") {
                headline.innerHTML += "&nbsp";
            } else {
                headline.innerHTML += `<span style="color: #35657b; text-shadow: 0 0 10px #35657b">${char}</span>`;
            }
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    typeWriter();
});



