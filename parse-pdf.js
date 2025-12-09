const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const resumePath = path.join(__dirname, 'public/assets/resume/Aanand Pandit Resume.pdf');

if (!fs.existsSync(resumePath)) {
    console.error('Resume not found at:', resumePath);
    // Try the other one?
    const resumePathAI = path.join(__dirname, 'public/assets/resume/Aanand Pandit Resume AI.pdf');
    if (fs.existsSync(resumePathAI)) {
        console.log('Found AI Resume, using that.');
        processResume(resumePathAI);
    } else {
        process.exit(1);
    }
} else {
    processResume(resumePath);
}

function processResume(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    pdf(dataBuffer).then(function (data) {
        console.log("RESUME_TEXT_START");
        console.log(data.text);
        console.log("RESUME_TEXT_END");
    }).catch(err => {
        console.error('Error parsing PDF:', err);
    });
}
