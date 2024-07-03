const  mongoose  = require("mongoose");

const reportSchema = new mongoose.Schema({
    mongoIdStore: {
        GoogleUserMongoID :{
            type: String
        }, 
        OrcidUserMongoID : {
            type: String
        },
        NormalUserMongoID : {
            type: String
        }
      },

    Reporting_Information: {

        Name: {
            type: String
        },
        Role: {
            type: String
        }, 
        Institution: {
            type: String
        },
        Date_of_inspection: {
            type: Date
        }, 
        Tools: {
            type: [String]
        }, 
        Methods: {
            type: [String]
        }, 
        Purpose_of_condition_report : {
            type: String
        },
       
        Name_of_client: {
            type: String 
        }, 
      
        Height:{
            type: String
        }, 
        Examination_distance:{
            type: String
        }, 
        Structural_framework:{
            type: String
        }, 
        Under_glass:{
            type: String
        }, 
        Quantity:{
            type: String
        }, 
        Quality:{
            type: String
        }, 
        Type:{
            type: String
        }, 
        Support:{
            type: String
        }, 
        Assets:{
            type: [String]
        }, 
        Protection_Used:{
            type: [String]
        }, 
      

        Reliability_collected_data:{
            type: String,
        }, 

        Cmnt_reliabilty :{
            type: String,
        }, 
        Person_present_during_inspection:{
            type: String
        }, 
        Contact_person_inspection:{
            type: String
        }, 
        Duration_of_assessment:{
            type: String
        }, 
        Inaccessibility:{
            type: String
        }, 
    }, 


    Object_identification: {

        Identification_no: {
            type: String
        },
        Date_of_acquisition: {
            type: Date
        }, 
       
        Title: {
            type: String
        }, 
       
        Author: {
            type: String
        }, 
       
        Date_of_creation : {
            type: Date
        }, 
        Ownership: {
            type: String 
        }, 
        Protection:{
            type: String
        }, 
        Summary:{
            type: String
        }, 
        
    }, 

    Object_description: {

        Material: {
            type: [String]
        }, 

        Structure : {
            type: String
        }, 
        Surface: {
            type: String
        },
        History: {
            type: String
        }, 
        Technique: {
            type: String
        }, 
        Weight: {
            type: String
        }, 
        Constituent_elements : {
            type: String
        },
        No_of_items : {
            type: String
        }, 
        Heights: {
            type: String 
        }, 
        
        Width:{
            type: String
        }, 
        Installation_notes:{
            type: String
        }, 
        Artist_installation_guide:{
            type: String
        }, 
        Object_creation_description:{
            type: String
        }, 

        originalNames: [],     // to collect originalname  coming from req.files 
              
        filePaths: []  ,     // after making new path and updating database 
        
        captions: [], 

        //images: []
        
        
        
    }, 

    Object_environment: {

        Environment: {
            type: String
        },
        Effect : {
            type: String
        }, 
       
        
    }, 

    Conditions_description: {

        Info_observed: {
            type: String
        },
        Report_change : {
            type: String
        }, 
        captions: [], 

        originalNames: [],

        //images: [],

        filePaths: []  ,
       
        
    },

    Diagnostic_and_recommendations: {

        Descriptive_diagnosis: {
            type: String
        },
        Recommendations : {
            type: String
        }, 

        Investigations : {
            type: String
        }
       
        
    }, 

    submissionTimestamp: {
        type: Date,
        default: Date.now 
    },

   


      
   
})

const Report = mongoose.model('Reportable', reportSchema )

module.exports = Report;