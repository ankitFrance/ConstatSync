document.addEventListener('DOMContentLoaded', function () {
  var currentStep = 1;
  var progresStep = 0;

 
  document.querySelectorAll('.next').forEach(function (nextButton) {
      nextButton.addEventListener('click', function () {
          document.getElementById('step' + currentStep).classList.remove('active');
          currentStep++;
          progresStep++;
          document.getElementById('step' + currentStep).classList.add('active');
          //console.log('when clicked next',currentStep)
          updateProgressBarNormal();

      });
  });

 
  document.querySelectorAll('.prev').forEach(function (prevButton) {
      prevButton.addEventListener('click', function () {
          document.getElementById('step' + currentStep).classList.remove('active');
          currentStep--;
          progresStep--;
          document.getElementById('step' + currentStep).classList.add('active');
          //console.log('when clicked previous',currentStep)
          updateProgressBarNormal();
      });
  });

 
  document.getElementById('summaryDiv').addEventListener('click', function (event) {
      if (event.target && event.target.matches('i.fas.fa-pencil-alt')) {
          var pencilId = event.target.id;
          var stepNumber = parseInt(pencilId.replace('pencil', ''));
          showFormStep(stepNumber);
         
      }
  });


  function showFormStep(stepNumber) {
      
      document.querySelectorAll('.step-form').forEach(function (step) {
          step.classList.remove('active');
      });

     
      document.getElementById('step' + stepNumber).classList.add('active');
     
      updateProgressBar(stepNumber - 1);
      currentStep = stepNumber;
      progresStep = currentStep - 1;
      $('#summaryModal').modal('hide');
      /**********After modal close, remove the loaded data ****************************************** */
      const form = document.getElementById('registrationForm') || document.getElementById('UpdateForm');
      if (form) {
      document.getElementById('summaryDiv').innerHTML = '';
      const inputNames = ['captions', 'captions2', 'fileNames', 'fileNames2', 'images', 'images2'];
        inputNames.forEach(name => {
            const input = form.querySelector(`input[name="${name}"]`);
            if (input) {
                input.remove();
            }
        });
      }
      /********************************************************************************************** */
    }

  
  function updateProgressBar(progresStep) {
      var progressBarWidth = progresStep * 20;
      document.querySelector('.progress-bar').style.width = progressBarWidth + '%';
  }

  function updateProgressBarNormal() {
    var progressBarWidth = progresStep * 20;
    document.querySelector('.progress-bar').style.width = progressBarWidth + '%';
}
});



//******************************************************* FETCH FROM EROS ************************************************************************ */


document.getElementById('FetchEROS').addEventListener('click', function() {

  var identificationNumber = document.getElementById('identification_no').value;

  var apiUrl = 'https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/notices-d-oeuvres-du-c2rmf/records?where=numero_de_reference_c2rmf%20like%20%22' + encodeURIComponent(identificationNumber) + '%22';
  var artiste = document.getElementById('author');
  var titre_ou_designation = document.getElementById('title');
  var hauteur_ou_diametre_mm = document.getElementById('heights');
  var largeur_ou_diametre_mm= document.getElementById('width');
  var date_of_acq = document.getElementById('date_of_acquisition')

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          
          console.log(data);

        
          artiste.value = data.results[0].artiste;
          
         
          titre_ou_designation.value = data.results[0].titre_ou_designation;

        
          hauteur_ou_diametre_mm.value = data.results[0].hauteur_ou_diametre_mm;

        
          largeur_ou_diametre_mm.value = data.results[0].largeur_ou_diametre_mm;


          var year = data.results[0].date_d_acquisition;
          var formattedDate =  year + "-01-01";
          console.log(formattedDate)
          date_of_acq.value = formattedDate;

          document.getElementById('successAlert').style.display = 'block';
          
          setTimeout(function() {
            document.getElementById('successAlert').style.display = 'none';
          }, 2000);



      })
      .catch(error => {
          console.error('Error fetching data:', error);
          document.getElementById('errorAlert').style.display = 'block';

        
          artiste.value = '';
          
         
          titre_ou_designation.value = '';

        
          hauteur_ou_diametre_mm.value = '';

         
          largeur_ou_diametre_mm.value = '';

          date_of_acq.value = '';
          
          setTimeout(function() {
            document.getElementById('errorAlert').style.display = 'none';
          }, 2000);
      });
});



//************************************************Add options from text box*************************************************************************************** */

document.getElementById('buttonForAddTool').addEventListener('click', function() {
  var newTool = document.getElementById('exampleInputTextTool').value;
  if (newTool) {
    var select = document.getElementById('tools');
    var option = document.createElement('option');
    option.value = newTool;
    option.text = newTool;
    select.add(option);
    document.getElementById('exampleInputTextTool').value = ''; 
  }
});

document.getElementById('buttonForAddMethod').addEventListener('click', function() {
  var newMethod = document.getElementById('exampleInputTextMethod').value;
  if (newMethod) {
    var select = document.getElementById('methods');
    var option = document.createElement('option');
    option.value = newMethod;
    option.text = newMethod;
    select.add(option);
    document.getElementById('exampleInputTextMethod').value = ''; 
  }
});

document.getElementById('buttonForAddAsset').addEventListener('click', function() {
  var newAsset = document.getElementById('exampleInputTextAsset').value;
  if (newAsset) {
    var select = document.getElementById('assets');
    var option = document.createElement('option');
    option.value = newAsset;
    option.text = newAsset;
    select.add(option);
    document.getElementById('exampleInputTextAsset').value = ''; 
  }
});


document.getElementById('buttonForAddProtection').addEventListener('click', function() {
  var newProt = document.getElementById('exampleInputTextProt').value;
  if (newProt) {
    var select = document.getElementById('protectionUsed');
    var option = document.createElement('option');
    option.value = newProt;
    option.text = newProt;
    select.add(option);
    document.getElementById('exampleInputTextProt').value = ''; 
  }
});


document.getElementById('buttonForAddMaterial').addEventListener('click', function() {
  var newProt = document.getElementById('exampleInputTextMaterial').value;
  if (newProt) {
    var select = document.getElementById('material');
    var option = document.createElement('option');
    option.value = newProt;
    option.text = newProt;
    select.add(option);
    document.getElementById('exampleInputTextMaterial').value = ''; 
  }
});


//********************************************************** FETCH FROM JOCONDE *********************************************************************** */



document.getElementById('FetchJOCONDE').addEventListener('click', function() {

  var identificationNumber = document.getElementById('identification_no').value;

  var apiUrl = 'https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/base-joconde-extrait/records?select=*&where=reference%20like%20%22'+ encodeURIComponent(identificationNumber) +'%22';

  var artiste = document.getElementById('author');
  var titre_ou_designation = document.getElementById('title');
  var Hauteur = document.getElementById('heights');
  var Largeur = document.getElementById('width');
  var date_of_crea = document.getElementById('date_of_creation')

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          
          console.log(data);

          
          artiste.value = data.results[0].auteur;
          
         
          titre_ou_designation.value = data.results[0].titre;

          
          var mesureStringforHauteur = data.results[0].mesures; // "Hauteur 34 ; Largeur 24"
          var hauteurValue = mesureStringforHauteur.split(';')[0].trim().split(' ')[1]; // "34"
          Hauteur.value = hauteurValue; 

         
          var mesureStringforLargeur = data.results[0].mesures; // "Hauteur 34 ; Largeur 24"
          var LargeurValue = mesureStringforLargeur.split(';')[1].trim().split(' ')[1]; // "34"
          Largeur.value = LargeurValue; 

          date_of_crea.value = data.results[0].date_creation;


          document.getElementById('successAlert').style.display = 'block';
          
          setTimeout(function() {
            document.getElementById('successAlert').style.display = 'none';
          }, 2000);
            

      })
      .catch(error => {
          console.error('Error fetching data:', error);
          document.getElementById('errorAlert').style.display = 'block';

         
          artiste.value = '';
          
         
          titre_ou_designation.value = '';

         
          Hauteur.value = ''; 

         
          Largeur.value = ''; 

          date_of_crea.value = '';


          
          setTimeout(function() {
            document.getElementById('errorAlert').style.display = 'none';
          }, 2000);
          

      });
});





//**********************************************************FETCH FROM LOUVRE************************************************************************* */



//*********************************************************************************************************************************************** */






//******************************************************* UPLOAD FILES ON FORM 3 ********************************************************************************** */

  let uploadedFiles = []; // Define an array to store uploaded files with their captions and names
  let allFiles = []; // Array to store all files uploaded


function displayUploadMessage() {

  let filesUploaded = document.getElementById('inputGroupFile02').files;
  allFiles = allFiles.concat(Array.from(filesUploaded));
  console.log('files uploaded are', filesUploaded)
  console.log('all files are', allFiles);
  const previewContainer = document.getElementById('previewContainer');


  previewContainer.innerHTML = '';  // Clear previous previews
  uploadedFiles = []; // Clear uploadedFiles array

  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i];
    const reader = new FileReader();

    reader.onload = function(e) {
    //*****DIV INSIDE WHICH ELEMENTS ARE THERE ********/
      const previewItem = document.createElement('div');
      previewItem.classList.add('preview-item');

    //******************IMAGE ************************/
      const previewImage = document.createElement('img');
      previewImage.classList.add('preview-image');
      previewImage.src = e.target.result;
      previewItem.appendChild(previewImage);

    //******************FILE NAME *******************/
      const fileNameText = document.createElement('p');
      fileNameText.classList.add('file-name');
      fileNameText.innerText = file.name;
      previewItem.appendChild(fileNameText);

    //******************TEXT FIELD *******************/
      const inputFieldCaption = document.createElement('input');
      inputFieldCaption.setAttribute('type', 'text');
      inputFieldCaption.classList.add('form-control'); 
      inputFieldCaption.classList.add('caption');
      inputFieldCaption.setAttribute('placeholder', 'Enter caption here');
      inputFieldCaption.addEventListener('input', function() {
      updateCaption(file.name, inputFieldCaption.value);
      });
      previewItem.appendChild(inputFieldCaption);

    //******DELETE BUTTON****************************** */

      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger'); 
      deleteButton.setAttribute('type', 'button'); 
      deleteButton.addEventListener('click', function() {
        deleteFile(file.name);
        previewContainer.removeChild(previewItem);
      });
      previewItem.appendChild(deleteButton);


//************************************************ */
      previewContainer.appendChild(previewItem);

//************************************************ */
      // Push the uploaded file into the array
      uploadedFiles.push({

        image: e.target.result,
        caption: '',
        fileName: file.name

      });

       console.log('uploaded Files are', uploadedFiles)
       updateInputFiles();

    };
       reader.readAsDataURL(file);
  }}

//************************************************ */

  function updateInputFiles() {
    const inputElement = document.getElementById('inputGroupFile02');
    const updatedFiles = new DataTransfer();
  
    uploadedFiles.forEach(file => {
      const blob = dataURItoBlob(file.image);
      const fileItem = new File([blob], file.fileName);
      updatedFiles.items.add(fileItem);
    });
  
    inputElement.files = updatedFiles.files;
  }

//************************************************* */

  function updateCaption(fileName, newCaption) {
    uploadedFiles.forEach(upload => {
    if (upload.fileName === fileName) {
    upload.caption = newCaption;
  }
  });
  //console.log(uploadedFiles);
  }

/************************************************* */
  function deleteFile(fileName) {
    uploadedFiles = uploadedFiles.filter(file => file.fileName !== fileName);
    allFiles = allFiles.filter(file => file.name !== fileName);

    updateInputFiles();
  }

/************************************************* */
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
    return new Blob([ab], { type: mimeString });
  }

  /************************************************ */

//************************************************************************************************************************************************














//************************************************ UPLOAD FILES ON FORM 5 **********************************************************************************

  let uploadedFiles2 = []; // Define an array to store uploaded files with their captions and names
  let allFiles2 = [];

  function displayUploadMessage2() {

  let filesUploaded2 = document.getElementById('inputGroupFile04').files;
  allFiles2 = allFiles2.concat(Array.from(filesUploaded2));
  console.log('files uploaded are', filesUploaded2);
  console.log('all files are', allFiles2);
  const previewContainer2 = document.getElementById('previewContainer1');


  previewContainer2.innerHTML = '';  // Clear previous previews
  uploadedFiles2 = []; // Clear uploadedFiles array

  for (let i = 0; i < allFiles2.length; i++) {
    const file = allFiles2[i];
    const reader = new FileReader();

  reader.onload = function(e) {

    //*****DIV INSIDE WHICH ELEMENTS ARE THERE ********/
    const previewItem = document.createElement('div');
    previewItem.classList.add('preview-item');

    //******************IMAGE ************************/
    const previewImage = document.createElement('img');
    previewImage.classList.add('preview-image');
    previewImage.src = e.target.result;
    previewItem.appendChild(previewImage);

    //******************FILE NAME *******************/
    const fileNameText = document.createElement('p');
    fileNameText.classList.add('file-name');
    fileNameText.innerText = file.name;
    previewItem.appendChild(fileNameText);

    //******************TEXT FIELD *******************/
    const inputFieldCaption = document.createElement('input');
    inputFieldCaption.setAttribute('type', 'text');
    inputFieldCaption.classList.add('form-control'); 
    inputFieldCaption.classList.add('caption');
    inputFieldCaption.setAttribute('placeholder', 'Enter caption here');
    inputFieldCaption.addEventListener('input', function() {
      updateCaption2(file.name, inputFieldCaption.value);
    });
    previewItem.appendChild(inputFieldCaption);

    //******DELETE BUTTON****************************** */

     
    const deleteButton2 = document.createElement('button');
    deleteButton2.innerText = 'Delete';
    deleteButton2.classList.add('btn', 'btn-danger'); 
    deleteButton2.setAttribute('type', 'button'); 
    deleteButton2.addEventListener('click', function() {
        deleteFile2(file.name);
        previewContainer2.removeChild(previewItem);
    });
      previewItem.appendChild(deleteButton2);
  
  
    //************************************************ */
    previewContainer2.appendChild(previewItem);

    //************************************************ */
    // Push the uploaded file into the array
    uploadedFiles2.push({
      image: e.target.result,
      caption: '',
      fileName: file.name
    });
    console.log('uploaded Files are', uploadedFiles2)
    updateInputFiles2();
    };
    reader.readAsDataURL(file);
  }}

  /*************************************************** */
  function updateInputFiles2() {
    const inputElement = document.getElementById('inputGroupFile04');
    const updatedFiles = new DataTransfer();
    
    uploadedFiles2.forEach(file => {
      const blob = dataURItoBlob(file.image);
      const fileItem = new File([blob], file.fileName);
      updatedFiles.items.add(fileItem);
    });
    
    inputElement.files = updatedFiles.files;
  }
  /************************************************ */

  function updateCaption2(fileName, newCaption) {
    uploadedFiles2.forEach(upload => {
      if (upload.fileName === fileName) {
        upload.caption = newCaption;
      }
    });
    // console.log(uploadedFiles);
    }

  /*************************************** *********/

    function deleteFile2(fileName) {
      uploadedFiles2 = uploadedFiles2.filter(file => file.fileName !== fileName);
      allFiles2 = allFiles2.filter(file => file.name !== fileName);
    
      updateInputFiles2();
    }

  /*************************************************** */ 
    function dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      return new Blob([ab], { type: mimeString });
    }
  /**************************************************** */


//**********************************************************************************************************************************************










//************************************************************ MODAL JAVASCRIPT *********************************************************************************
let images = [];
let captions = [];
let fileNames = [];
let images2 = [];
let captions2 = [];
let fileNames2 = [];

function viewSummary(formId) {

//*********** FOR UPLOADING (FIRST INPUT IMAGE AT FORM 3) **************

  images = [];
  captions = [];
  fileNames = [];

  uploadedFiles.forEach(upload => {
  images.push(upload.image);
  captions.push(upload.caption);
  fileNames.push(upload.fileName);
  });


  const form = document.getElementById(formId);
  console.log(form)

  const captionsInput = document.createElement('input');
  captionsInput.type = 'hidden';
  captionsInput.style.display = 'none';
  captionsInput.style.visibility = 'hidden';
  captionsInput.name = 'captions';
  captionsInput.value = JSON.stringify(captions);
  console.log('captions iNput' , captionsInput)
  form.appendChild(captionsInput);

  const imagesInput = document.createElement('input');
  imagesInput.type = 'hidden';
  imagesInput.style.display = 'none';
  imagesInput.style.visibility = 'hidden';
  imagesInput.name = 'images';
  imagesInput.value = JSON.stringify(images);
  form.appendChild(imagesInput);

  const fileNamesInput = document.createElement('input');
  fileNamesInput.type = 'hidden';
  fileNamesInput.style.display = 'none';
  fileNamesInput.style.visibility = 'hidden';
  fileNamesInput.name = 'fileNames';
  fileNamesInput.value = JSON.stringify(fileNames);
  form.appendChild(fileNamesInput);


  console.log("Images:", images);
  console.log("Captions:", captions);
  console.log("File Names:", fileNames);

  var imagesHTML = '';

  for (let i = 0; i < images.length; i++) {

    imagesHTML += `

    <img src="${images[i]}" style="width: 400px; height: 400px;">
    <p>${captions[i]}</p>
    <p>${fileNames[i]}</p>

  `;
}

//************************ *********************************************



//***********FOR UPLOADING (SECOND INPUT IMAGE AT FORM 5) **************

  images2 = [];
  captions2 = [];
  fileNames2 = [];

  uploadedFiles2.forEach(upload => {
    images2.push(upload.image);
    captions2.push(upload.caption);
    fileNames2.push(upload.fileName);
  });

  const form2 = document.getElementById(formId);

  const captionsInput2 = document.createElement('input');
  captionsInput2.type = 'hidden';
  captionsInput2.style.display = 'none';
  captionsInput2.style.visibility = 'hidden';
  captionsInput2.name = 'captions2';
  captionsInput2.value = JSON.stringify(captions2);
  form2.appendChild(captionsInput2);

  const imagesInput2 = document.createElement('input');
  imagesInput2.type = 'hidden';
  imagesInput2.style.display = 'none';
  imagesInput2.style.visibility = 'hidden';
  imagesInput2.name = 'images2';
  imagesInput2.value = JSON.stringify(images2);
  form2.appendChild(imagesInput2);

  const fileNamesInput2 = document.createElement('input');
  fileNamesInput2.type = 'hidden';
  fileNamesInput2.style.display = 'none';
  fileNamesInput2.style.visibility = 'hidden';
  fileNamesInput2.name = 'fileNames2';
  fileNamesInput2.value = JSON.stringify(fileNames2);
  form2.appendChild(fileNamesInput2);

  var imagesHTML2 = '';
  
  for (let i = 0; i < images2.length; i++) {     
    imagesHTML2 += `
  
    <img src="${images2[i]}" style="width: 400px; height: 400px;">
    <p>${captions2[i]}</p>
    <p>${fileNames2[i]}</p>
  `;
}


//************************ *********************************************

  // FOR SLIDE 1
  const name = document.getElementById('name').value;             
  const role = document.getElementById('role').value;
  const institution = document.getElementById('institution').value;
  let doi;
  let doii;
  if (formId === 'registrationForm') {
   doi = document.getElementById('doi').value;
  // Do something with the doi variable for register form
  } else if (formId === 'UpdateForm') {
   doii = document.getElementById('doii').value;
  // Do something with the doii variable for update form
  }
  const selectElementforTools = document.getElementById('tools');
  const selectedOptionsForTools = Array.from(selectElementforTools.selectedOptions);
  const tools = selectedOptionsForTools.map(option => option.value).join(', ');

  const selectElementforMethod = document.getElementById('methods');
  const selectedOptionsForMethod = Array.from(selectElementforMethod.selectedOptions);
  const methods = selectedOptionsForMethod.map(option => option.value).join(', ');

  const purpose_of_condition_report = document.getElementById('purpose_of_condition_report').value;
  const name_of_client = document.getElementById('name_of_client').value;
  const height = document.getElementById('height').value;
  const examination_distance = document.getElementById('examination_distance').value;
  const structural_framework = document.getElementById('structural_framework').value;
  const under_glass = document.getElementById('under_glass').value;
  const quantity = document.getElementById('quantity').value;
  const quality = document.getElementById('quality').value;
  const type = document.getElementById('type').value;

  const selectElementforAssets = document.getElementById('assets');
  const selectedOptionsForAssets = Array.from(selectElementforAssets.selectedOptions);
  const assets = selectedOptionsForAssets.map(option => option.value).join(', ');

  const selectElementforProtection = document.getElementById('protectionUsed');
  const selectedOptionsForProtection = Array.from(selectElementforProtection.selectedOptions);
  const protectionUsed = selectedOptionsForProtection.map(option => option.value).join(', ');

  const reliability_collected_data = document.querySelector('input[name="reliability_collected_data"]:checked')?.value || '';
  const support = document.querySelector('input[name="support"]:checked')?.value || '';
  const cmnt_reliabilty = document.getElementById('cmnt_reliabilty').value;
  const person_present_during_inspection = document.getElementById('person_present_during_inspection').value;
  const contact_person_inspection = document.getElementById('contact_person_inspection').value;
  const duration_of_assessment = document.getElementById('duration_of_assessment').value;
  const inaccessibility = document.getElementById('inaccessibility').value;


// FOR SLIDE 2
  const identification_no  = document.getElementById('identification_no').value;
  const date_of_acquisition = document.getElementById('date_of_acquisition').value;
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const date_of_creation = document.getElementById('date_of_creation').value;
  const ownership = document.getElementById('ownership').value;
  const protection = document.getElementById('protection').value;
  const summary = document.getElementById('summary').value;

// FOR SLIDE 3
  const selectElementforMaterial = document.getElementById('material');
  const selectedOptionsForMaterial = Array.from(selectElementforMaterial.selectedOptions);
  const material = selectedOptionsForMaterial.map(option => option.value).join(', ');
  const structure = document.getElementById('structure').value;
  const surface = document.getElementById('surface').value;
  const history = document.getElementById('history').value;
  const technique = document.getElementById('technique').value;
  const weight = document.getElementById('weight').value;
  const contituent_elements = document.getElementById('contituent_elements').value;
  const no_of_items = document.getElementById('no_of_items').value;
  const heights = document.getElementById('heights').value;
  const heightUnits = document.getElementById('heightUnits').value
  const width = document.getElementById('width').value;
  const widthUnits = document.getElementById('widthUnits').value
  const installation_notes = document.getElementById('installation_notes').value;
  const artist_installation_guide = document.getElementById('artist_installation_guide').value;
  const object_creation_description = document.getElementById('object_creation_description').value;


 // FOR SLIDE 4
  const environment = document.getElementById('environment').value;
  const effect= document.getElementById('effect').value;

  // FOR SLIDE 5

  const info_observed = document.getElementById('info_observed').value;
  const report_change = document.getElementById('report_change').value;

  // FOR SLIDE 6

  const descriptive_diagnosis = document.getElementById('descriptive_diagnosis').value;
  const recommendations = document.getElementById('recommendations').value;
  const investigations = document.getElementById('investigations').value;

  // Check which language is selected 
  const selectedLanguage = document.getElementById('languageSelect').value;
  if (selectedLanguage === 'en')
    {
      var summaryText = `
      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      REPORTING INFORMATION 
      <i id="pencil1" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>
      <p><strong> Name:</strong> ${name} </p>
      <p><strong> Role:</strong> ${role} </p>
      <p><strong> Institution:</strong> ${institution} </p>
      `;

      if (doi) {
      summaryText += `<p><strong> Date of Inspection:</strong> ${doi} </p>`;
      }

      if (doii) {
      summaryText += `<p><strong> Date of Inspection:</strong> ${doii} </p>`;
      }

      summaryText += `

      <p><strong> Tools:</strong> ${tools} </p>
      <p><strong> Methods:</strong> ${methods} </p>
      <p><strong> Purpose of Condition Report:</strong> ${purpose_of_condition_report} </p>
      <p><strong> Name of Client :</strong> ${name_of_client} </p>
      <p><strong> Height:</strong> ${height} </p>
      <p><strong> Examination Distance:</strong> ${examination_distance} </p>
      <p><strong> Structural Framework:</strong> ${structural_framework} </p>
      <p><strong> Under glass ?:</strong> ${under_glass} </p>
      <p><strong> Quantity:</strong> ${quantity} </p>
      <p><strong> Quality:</strong> ${quality} </p>
      <p><strong> Type:</strong> ${type} </p>
      <p><strong> Assets used:</strong> ${assets} </p>
      <p><strong> Protection used:</strong> ${protectionUsed} </p>

      <p><strong> Reliability of collected data ?:</strong> ${reliability_collected_data} </p>
      <p><strong> Support ?:</strong> ${support} </p>
      <p><strong> Comment on reliability of data:</strong> ${cmnt_reliabilty} </p>
      <p><strong> Person(s) present during the inspection :</strong> ${person_present_during_inspection} </p>
      <p><strong> Contact persons for the inspection :</strong> ${contact_person_inspection} </p>
      <p><strong> Time used to complete the survey:</strong> ${duration_of_assessment} </p>
      <p><strong> Inaccessibility of parts of Asset:</strong> ${inaccessibility} </p>



      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      OBJECT IDENTIFICATION
      <i id="pencil2" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>
      <p><strong> Identification Number:</strong> ${identification_no} </p>
      <p><strong> Date of Acquisition:</strong> ${date_of_acquisition} </p>
      <p><strong> Title:</strong> ${title} </p>
      <p><strong> Authors:</strong> ${author} </p>
      <p><strong> Date of creation :</strong> ${date_of_creation} </p>
      <p><strong> Ownership:</strong> ${ownership} </p>
      <p><strong> Protection:</strong> ${protection} </p>
      <p><strong> Summary:</strong> ${summary} </p>



      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      OBJECT DESCRIPTION 
      <i id="pencil3" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>

      <p><strong> Materials:</strong> ${material} </p>
      <p><strong> Structure:</strong> ${structure} </p>
      <p><strong> Surface:</strong> ${surface} </p>
      <p><strong> History:</strong> ${history} </p>
      <p><strong> Technique:</strong> ${technique} </p>
      <p><strong> Weight:</strong> ${weight} </p>
      <p><strong> Constituent Elements:</strong> ${contituent_elements} </p>
      <p><strong> Number of items :</strong> ${no_of_items} </p>
      <p><strong> Height:</strong> ${heights} ${heightUnits} </p>
      <p><strong> Width:</strong> ${width} ${widthUnits} </p>
      <p><strong> Installation Notes:</strong> ${installation_notes} </p>
      <p><strong> Artist installation guide:</strong> ${artist_installation_guide} </p>
      <p><strong> Object creation description:</strong> ${object_creation_description} </p>
      <div>
      ${imagesHTML}
      </div>


      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      OBJECT ENVIRONMENT
      <i id="pencil4" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>

      <p><strong> Environment in which item is held:</strong> ${environment} </p>
      <p><strong> Effect of Environment on object:</strong> ${effect} </p>


      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      CONDITIONS DESCRIPTION (OBEJCT)
      <i id="pencil5" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>

      <p><strong> Information observed concerning current state of item :</strong> ${info_observed} </p>
      <p><strong> Please report the change (repair, treatment):</strong> ${report_change} </p>
      <div>
      ${imagesHTML2}
      </div>

      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      DIAGNOSTIC AND RECOMMENDATIONS
      <i id="pencil6" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>



      <p><strong> Descriptive diagnosis of reason for deterioration :</strong> ${descriptive_diagnosis} </p>
      <p><strong> Recommendations for further care and / or conservation:</strong> ${recommendations} </p>
      <p><strong> Further scientific, historical, technical or other investigation or analysis:</strong> ${investigations} </p>

      `;



      document.getElementById('summaryDiv').innerHTML = summaryText;

      let summaryModal = new bootstrap.Modal(document.getElementById('summaryModal'));
      summaryModal.show();

    } else {

      var summaryTextFr = `
      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      INFORMATIONS SUR LE CONSTAT
      <i id="pencil1" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>
      <p><strong> Nom de l'auteur:</strong> ${name} </p>
      <p><strong> Fonction:</strong> ${role} </p>
      <p><strong> Institution:</strong> ${institution} </p>
      `;

      if (doi) {
      summaryTextFr += `<p><strong> Date de l'inspection:</strong> ${doi} </p>`;
      }

      if (doii) {
      summaryTextFr += `<p><strong> Date de l'inspection:</strong> ${doii} </p>`;
      }

      summaryTextFr += `

      <p><strong> Outils:</strong> ${tools} </p>
      <p><strong> Méthodes:</strong> ${methods} </p>
      <p><strong> Objectif du constat d'état:</strong> ${purpose_of_condition_report} </p>
      <p><strong> Nom du client/commanditaire :</strong> ${name_of_client} </p>
      <p><strong> Hauteur:</strong> ${height} </p>
      <p><strong> Distance d'examen:</strong> ${examination_distance} </p>
      <p><strong> Structure portante:</strong> ${structural_framework} </p>
      <p><strong> Under glass ?:</strong> ${under_glass} </p>
      <p><strong> Quantité:</strong> ${quantity} </p>
      <p><strong> Qualité:</strong> ${quality} </p>
      <p><strong> Genre:</strong> ${type} </p>
      <p><strong> Actifs utilisés:</strong> ${assets} </p>
      <p><strong> Protection utilisée:</strong> ${protectionUsed} </p>

      <p><strong> Fiabilité des données collectées ?:</strong> ${reliability_collected_data} </p>
      <p><strong> Support ?:</strong> ${support} </p>
      <p><strong> Commentaire sur la fiabilité des données:</strong> ${cmnt_reliabilty} </p>
      <p><strong> Personne(s) présente(s) lors de l'inspection :</strong> ${person_present_during_inspection} </p>
      <p><strong> Personnes de contact pour l'inspection :</strong> ${contact_person_inspection} </p>
      <p><strong> Durée de l'évaluation:</strong> ${duration_of_assessment} </p>
      <p><strong> Partie(s) inaccessible(s):</strong> ${inaccessibility} </p>



      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      IDENTIFICATION DU BIEN
      <i id="pencil2" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>
      <p><strong> Numéro d'identification:</strong> ${identification_no} </p>
      <p><strong> Date de l'acquisition:</strong> ${date_of_acquisition} </p>
      <p><strong> Titre:</strong> ${title} </p>
      <p><strong> Auteur/Créateur:</strong> ${author} </p>
      <p><strong> Date de création :</strong> ${date_of_creation} </p>
      <p><strong> Propriété même si inconnu:</strong> ${ownership} </p>
      <p><strong> Informations sur les protections:</strong> ${protection} </p>
      <p><strong> Intérêt patrimonial (résumé):</strong> ${summary} </p>



      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      DESCRIPTION DU BIEN 
      <i id="pencil3" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>

      <p><strong> Matériaux:</strong> ${material} </p>
      <p><strong> Structures:</strong> ${structure} </p>
      <p><strong> Surfaces:</strong> ${surface} </p>
      <p><strong> Histoire:</strong> ${history} </p>
      <p><strong> Technique(s):</strong> ${technique} </p>
      <p><strong> Poids:</strong> ${weight} </p>
      <p><strong> Éléments constitutifs:</strong> ${contituent_elements} </p>
      <p><strong> Nombre d'objets :</strong> ${no_of_items} </p>
      <p><strong> Hauteur:</strong> ${heights} ${heightUnits} </p>
      <p><strong> Largeur:</strong> ${width} ${widthUnits} </p>
      <p><strong> Notes d'installation:</strong> ${installation_notes} </p>
      <p><strong> Guide d'installation de l'artiste:</strong> ${artist_installation_guide} </p>
      <p><strong> Description de la création de l'objet:</strong> ${object_creation_description} </p>
      <div>
      ${imagesHTML}
      </div>


      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      ENVIRONNEMENT DU BIEN
      <i id="pencil4" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>

      <p><strong> Environnement dans lequel le bien est conservé:</strong> ${environment} </p>
      <p><strong> Effet de l'environnement sur le bien:</strong> ${effect} </p>


      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      DESCRIPTION DE L'ÉTAT DU BIEN
      <i id="pencil5" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>

      <p><strong> Informations observées concernant l'état actuel du bien y compris l'historique de sa conservation :</strong> ${info_observed} </p>
      <p><strong> Veuillez signaler le changement (réparation, traitement):</strong> ${report_change} </p>
      <div>
      ${imagesHTML2}
      </div>

      <div style="position: relative;">
      <h5 style="color: white; background-color: green; padding: 10px; margin-bottom: 0;"> 
      DIAGNOSTIC ET RECOMMANDATIONS
      <i id="pencil6" class="fas fa-pencil-alt" style="float: right;"></i>
      </h5> 
      <hr style="border-color: darkblue; margin-top: 0;">
      </div>



      <p><strong> Diagnostic descriptif de la raison de la détérioration / Autres changements d'état :</strong> ${descriptive_diagnosis} </p>
      <p><strong> Recommandations pour des soins et/ou une conservation ultérieurs:</strong> ${recommendations} </p>
      <p><strong> Autres investigations ou analyses scientifiques, historiques, techniques ou autres:</strong> ${investigations} </p>

      `;



      document.getElementById('summaryDiv').innerHTML = summaryTextFr;

      let summaryModal = new bootstrap.Modal(document.getElementById('summaryModal'));
      summaryModal.show();



    }
  

  }

//**************************************************************************************************************************************************




//*************************************************** CLOSE MODAL *********************************************************************************** 

function closeModal() {
$('#summaryModal').modal('hide');

/**********After modal close, remove the loaded data ****************************************** */
const form = document.getElementById('registrationForm') || document.getElementById('UpdateForm');
if (form) {
  document.getElementById('summaryDiv').innerHTML = '';
  const inputNames = ['captions', 'captions2', 'fileNames', 'fileNames2', 'images', 'images2'];
        inputNames.forEach(name => {
            const input = form.querySelector(`input[name="${name}"]`);
            if (input) {
                input.remove();
            }
        });
}
/*********************************************************************************************** */
}

//****************************************************************************************************************************************************






//***************************************************** CHANGE LANGUAGE ***********************************************************************************************

function changeLanguage() {

  const selectedLanguage = document.getElementById('languageSelect').value;

  //***************************************** FOR SLIDE 1 *****************************************************
  document.getElementById('nameretrived').innerText = i18n[selectedLanguage].Name;
  document.getElementById('roleretrived').innerText = i18n[selectedLanguage].Role;
  document.getElementById('institutionretrieved').innerText = i18n[selectedLanguage].Institution;
 

  document.getElementById('date_of_inspection').innerText = i18n[selectedLanguage].Date_of_inspection;
  document.getElementById('purpose_of_condition_report').placeholder = i18n[selectedLanguage].Purpose_of_Condition_Report;
  document.getElementById('name_of_client').placeholder = i18n[selectedLanguage].Name_of_Client;
  document.getElementById('height').placeholder = i18n[selectedLanguage].Height;
  document.getElementById('examination_distance').placeholder = i18n[selectedLanguage].Examination_distance;
  document.getElementById('structural_framework').placeholder = i18n[selectedLanguage].Structural_framework;
  document.getElementById('under_glass').placeholder = i18n[selectedLanguage].Under_glass;
  document.getElementById('quantity').placeholder = i18n[selectedLanguage].Quantity;
  document.getElementById('quality').placeholder = i18n[selectedLanguage].Quality;
  document.getElementById('type').placeholder = i18n[selectedLanguage].Type;
  
  document.getElementById('person_present_during_inspection').placeholder = i18n[selectedLanguage].Person_Present_during_inspection;
  document.getElementById('working_conditions').innerText = i18n[selectedLanguage].working_conditions;
  document.getElementById('reporting_info_heading').innerText = i18n[selectedLanguage].heading_Reporting_info;
  
  
  document.getElementById('reliability_collect_data_label').innerText = i18n[selectedLanguage].Reliability_collected_dataLegend;
  document.getElementById('not_available').innerText = i18n[selectedLanguage].Not_available;
  document.getElementById('incomplete').innerText = i18n[selectedLanguage].Incomplete;
  document.getElementById('cmnt_reliabilty').placeholder = i18n[selectedLanguage].Cmnt_reliabilty;

  document.getElementById('additional_details').innerText = i18n[selectedLanguage].Additional_details;
  document.getElementById('person_present_during_inspection').placeholder = i18n[selectedLanguage].Person_present_during_inspection;
  document.getElementById('contact_person_inspection').placeholder = i18n[selectedLanguage].Contact_person_inspection;
  document.getElementById('duration_of_assessment').placeholder = i18n[selectedLanguage].Duration_of_assessment;
  document.getElementById('inaccessibility').placeholder = i18n[selectedLanguage].Inaccessibility;

 
  document.getElementById('exampleInputTextTool').placeholder = i18n[selectedLanguage].Enter_new_tool;
  document.getElementById('exampleInputTextMethod').placeholder = i18n[selectedLanguage].Enter_new_method;
  document.getElementById('exampleInputTextAsset').placeholder = i18n[selectedLanguage].Enter_new_asset;
  document.getElementById('exampleInputTextProt').placeholder = i18n[selectedLanguage].Enter_new_protection;
  document.getElementById('spanPhysical').innerText = i18n[selectedLanguage].sub_heading1_physical;
  document.getElementById('spanLight').innerText = i18n[selectedLanguage].sub_heading2_light;
  document.getElementById('sufficient_support').innerText = i18n[selectedLanguage].Sufficient_physical_support;
  document.getElementById('mounting_object').innerText = i18n[selectedLanguage].Mounting_object;

   //***************************************** FOR SLIDE 2 *****************************************************

  document.getElementById('identification_no').placeholder = i18n[selectedLanguage].Identification_Number;
  document.getElementById('doaLabel').innerText = i18n[selectedLanguage].Date_of_acqisation; //
  document.getElementById('identification_noLabel').innerText = i18n[selectedLanguage].Identification_noLabel; //
  document.getElementById('FetchEROS').innerText = i18n[selectedLanguage].Fetch_eros; //
  document.getElementById('FetchJOCONDE').innerText = i18n[selectedLanguage].Fetch_Joconde; //
  document.getElementById('title').placeholder = i18n[selectedLanguage].Title;
  document.getElementById('author').placeholder = i18n[selectedLanguage].Author;
  document.getElementById('docLabel').innerText = i18n[selectedLanguage].Date_of_creation; //
  document.getElementById('ownership').placeholder = i18n[selectedLanguage].Ownership;
  document.getElementById('protection').placeholder = i18n[selectedLanguage].Protection;
  document.getElementById('summary').placeholder = i18n[selectedLanguage].Summary_of_its_importance;
  document.getElementById('obj_identification_heading').innerText = i18n[selectedLanguage].heading_Object_iden;

  //***************************************** FOR SLIDE 3 *****************************************************

  document.getElementById('exampleInputTextMaterial').placeholder = i18n[selectedLanguage].Enter_new_material;
  document.getElementById('structure').placeholder = i18n[selectedLanguage].Structure; 
  document.getElementById('surface').placeholder = i18n[selectedLanguage].Surface;
  document.getElementById('history').placeholder = i18n[selectedLanguage].History;
  document.getElementById('technique').placeholder = i18n[selectedLanguage].Technique;
  document.getElementById('weight').placeholder = i18n[selectedLanguage].Weight;
  document.getElementById('contituent_elements').placeholder = i18n[selectedLanguage].Constituent_Elements;
  document.getElementById('no_of_items').placeholder = i18n[selectedLanguage].Number_of_items;
  
  document.getElementById('heights').placeholder = i18n[selectedLanguage].Heights;
  document.getElementById('width').placeholder = i18n[selectedLanguage].Width;
  document.getElementById('installation_notes').placeholder = i18n[selectedLanguage].Installation_Notes;
  document.getElementById('artist_installation_guide').placeholder = i18n[selectedLanguage].Artist_installation_guide;
  document.getElementById('object_creation_description').placeholder = i18n[selectedLanguage].Oc_description;
  document.getElementById('obj_desc_heading').innerText = i18n[selectedLanguage].heading_Object_desc;


  
  //***************************************** FOR SLIDE 4 *****************************************************

  document.getElementById('environment').placeholder = i18n[selectedLanguage].Env;
  document.getElementById('effect').placeholder = i18n[selectedLanguage].Effect_of_env; 
  document.getElementById('obj_env_heading').innerText = i18n[selectedLanguage].heading_Object_env; 


  //***************************************** FOR SLIDE 5 *****************************************************

  document.getElementById('info_observed').placeholder = i18n[selectedLanguage].Info_current_state;
  document.getElementById('report_change').placeholder = i18n[selectedLanguage].Changes_report; 
  document.getElementById('Cc_label').innerText = i18n[selectedLanguage].conditions_changed; 
  document.getElementById('cond_desc_heading').innerText = i18n[selectedLanguage].heading_Cond_desc; 


  
  //***************************************** FOR SLIDE 6 *****************************************************

  document.getElementById('descriptive_diagnosis').placeholder = i18n[selectedLanguage].Diagnosis;
  document.getElementById('recommendations').placeholder = i18n[selectedLanguage].Recommendations; 
  document.getElementById('investigations').placeholder = i18n[selectedLanguage].Further_study; 
  document.getElementById('diag_recc_heading').innerText = i18n[selectedLanguage].heading_diag_rec; 
  document.getElementById('optionalInfo').innerText = i18n[selectedLanguage].optional_info_diagnostic; 
  

  //***************************************** BUTTONS  *****************************************************

  var AllPreviousButtons =  document.querySelectorAll(".prev");
   
  AllPreviousButtons.forEach(element => {
    element.innerText = i18n[selectedLanguage].buttonPrevious;


  });


  var AllNextButtons =  document.querySelectorAll(".next");
   
  AllNextButtons.forEach(element => {
    element.innerText = i18n[selectedLanguage].buttonNext;


  });


  //***************************************** PHOTO UPLOAD  *****************************************************

    document.getElementById('normal_upload').innerText = i18n[selectedLanguage].normal_upload_text; 
    document.getElementById('damaged_upload').innerText = i18n[selectedLanguage].damaged_upload_text; 

  
  }


  changeLanguage();   // Initialize placeholders with default language  //calling of function


//******************************************************************************************************************************* 








//*********************************************************************************************************************************

function record(){

  var recognition = new webkitSpeechRecognition();
  recognition.lang = "fr-FR";
  recognition.onresult = function(event){

      document.getElementById('purpose_of_condition_report').value = event.results[0][0].transcript;
  }
  recognition.start();
}

//****************************************************************************************************************************************************************




//***************************************************************************************************************************************************************

function getTodayDate() {
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`;
}

// Set the value of the date input to today's date
document.getElementById('doi').value = getTodayDate();



//*********************************************************************************************************************************  function updateCheckboxValue(checkbox, idFetch) {