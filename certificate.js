const nameInput = document.getElementById('student-name');
const generateButton = document.getElementById('make-certificate');
generateButton.addEventListener('click', () => {
    if(nameInput.value) {
        pdf(nameInput.value)
    }
})

function pdf(name) {
    let doc = new jsPDF({
        orientation: "landscape"
    });

    // Colocando o titulo
    const color = "#74CBFC";
    doc.setFillColor(color);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
    doc.setTextColor("#FFFFFF");
    doc.setFont("helvetica","bold");
    doc.setFontSize(40);
    let text = "CERTIFICADO";
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    let x = (pageWidth - textWidth) / 2;
    doc.text(text, x, 60);

    // Colocando as imagens
    let image = new Image();
    image.src = "../img/pdf/logo.png";
    x = (pageWidth - 35) / 2;
    doc.addImage(image, x, 21, 35, 23);

    let image2 = new Image();
    image2.src = "../img/pdf/parte_cima.png";
    x = (pageWidth - 88);
    doc.addImage(image2, "png", x, 0, 88, 75);

    let image3 = new Image();
    image3.src = "../img/pdf/parte_baixo.png";
    doc.addImage(image3, 0, pageHeight - 77.37, 101.73, 77.37);

    // escrevendo o texto
    doc.setFontSize(30);
    const text1 = "Certificamos que";
    const text2 = "realizou todas as etapas de Git Factory";
    textWidth = doc.getStringUnitWidth(text1) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    x = (pageWidth - textWidth) / 2;
    doc.text(text1,x, 90);
    doc.setFontSize(40);
    textWidth = doc.getStringUnitWidth(name) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    x = (pageWidth - textWidth) / 2;
    doc.text(name,x, 105);
    doc.setFontSize(30);
    textWidth = doc.getStringUnitWidth(text2) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    x = (pageWidth - textWidth) / 2;
    doc.text(text2,x, 120);

    doc.setFontSize(14);
    let creators = "Ministrado por: Beatriz Belaparte Favero , Davi Piassi Barros dos Santos, Heitor Kendi Katsuki,";
    textWidth = doc.getStringUnitWidth(creators) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    x = (pageWidth - textWidth) / 2;
    doc.text(creators,x, 150);

    creators = " João Victor Diniz Araújo, Pedro Moises Araújo de Gusmão";
    textWidth = doc.getStringUnitWidth(creators) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    x = (pageWidth - textWidth) / 2;
    doc.text(creators,x, 155);

    doc.save("certificado.pdf");
}
