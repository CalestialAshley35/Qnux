function selectType(type) {
  document.getElementById('text-input').style.display = 'none';
  document.getElementById('image-input').style.display = 'none';
  document.getElementById('output').style.display = 'none';

  if (type === 'text') {
    document.getElementById('text-input').style.display = 'block';
  } else if (type === 'image') {
    document.getElementById('image-input').style.display = 'block';
  }
}

function downloadText() {
  const packageName = document.getElementById('package-name').value;
  const packageText = document.getElementById('package-text').value;

  if (packageName && packageText) {
    const blob = new Blob([packageText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    document.getElementById('output-text').innerText = packageText;
    document.getElementById('output-image').style.display = 'none';
    document.getElementById('output').style.display = 'block';
    document.getElementById('download-btn').onclick = function() {
      const a = document.createElement('a');
      a.href = url;
      a.download = `${packageName}.bruh`; // Downloads as <name>.bruh
      a.click();
    };
  } else {
    alert("Please fill in the package name and text.");
  }
}

function downloadImage() {
  const file = document.getElementById('package-image').files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const image = e.target.result;
      document.getElementById('output-image').src = image;
      document.getElementById('output-image').style.display = 'block';
      document.getElementById('output-text').innerText = '';
      document.getElementById('output').style.display = 'block';

      document.getElementById('download-btn').onclick = function() {
        const a = document.createElement('a');
        a.href = image;
        a.download = file.name; // Downloads with the original file name and extension
        a.click();
      };
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please upload an image.");
  }
}
