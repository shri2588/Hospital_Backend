import { buildSchema } from 'graphql'

const schema = buildSchema(`
    type Hospitals {
        _id: ID
        hospitalName: String!
        hospitalRegistrationNo: String!
        hospitalType : String!
        government: String!
        address: String!
        state: String!
        district: String!
        pincode: String!
        website: String
        lognitude: String!
        latitude: String!
        ownerName: String!
        ownerContactNo: String!
        ownerEmail: String!
        password: String!
        status: String!
    }

    type wards {
        _id: ID
        wardsName: String!
        wardNo: String!
    }

    type doctors {
        _id: ID
        docName: String!
        docReg: String!
        docSp: String!
        docWard: String
    }

    type beds {
        _id: ID
        privateBeds: Int!
        generalBeds: Int!
        wardsName: String
    }

    type Admin {
        _id: ID
        adminId: String!
        password: String!
        role: String!
    }

    type AdminAuth {
        adminId: ID!
        token: String!
        tokenExpiration: String!
    }

    type HospitalLogin {
        _id: ID
        hosId: String!
        password: String!
    }

    type HospitalAuth {
        hosId: ID!
        hosToken: String!
        hosTokenExpiration: String!
    }


    type User {
        name: String!
    }

    type TempUser {
        _id: ID
        UserName: String!
        PatientName: String!
        UserContect: String!
        UserAadhar: String!
        otp: String!
    }


    type PatientAdmit{
        _id:ID
        hospitalId:ID
        bedId: ID
        fname:String!
        lname:String!
        aadharNo: String!
        contactNo: String!
        email: String!
        dob: String!
        gender:String!
        marital: String!
        disease: String!
        age:Int!
        address: String!
        state:String!
        district:String!
        city:String!
        pincode:String!
        ward: String!
        bedtype: String!
    }

    input HospitalInput {
        hospitalName: String!
        hospitalRegistrationNo: String!
        hospitalType : String!
        government: String!
        address: String!
        state: String!
        district: String!
        pincode: String!
        website: String
        lognitude: String!
        latitude: String!
        ownerName: String!
        ownerContactNo: String!
        ownerEmail: String!
        password: String!
        status: String!
    }

    input wardInput {
        wardsName: String
        wardNo: String
    }

    input doctorInput {
        docName: String!
        docReg: String!
        docSp: String!
        docWard: String
    }

    input bedInput {
        privateBeds: Int!
        generalBeds: Int!
        wardsName: String
    }

    input adminInput {
        adminId: String!
        password: String!
        role: String!
    }

    input HospitalLoginInput {
        hosId: String!
        password: String!
    }

    input userInput{
        name: String!
    }

    input userTempInput {
        UserName: String!
        PatientName: String!
        UserContect: String!
        UserAadhar: String!
        otp: String!
    }
     
    input PatientAdmitInput{

        fname:String!
        lname:String!
        aadharNo: String!
        contactNo: String!
        email: String!
        dob: String!
        gender:String!
        marital: String!
        disease: String!
        age:Int!
        address: String!
        state:String!
        district:String!
        city:String!
        pincode:String!
        ward: String!
        bedtype: String!

    }



    type Query {
         getHospital: [Hospitals]!
         getActiveHospital: [Hospitals]
         getSingleHospital(id: ID): Hospitals!
         getPendingHospitals: [Hospitals]!
 
         getWards: [wards]
         getDoctors: [doctors]
         getBeds: [beds]
         getWardsById(id:ID): [wards]

         getTempUser: [TempUser]

         getUser: [User]


         adminLogin(loginId: String! password: String!): AdminAuth

         hospitalLogin(hosId: String! password: String!): HospitalAuth


         getWardsByOwnId(id:ID): wards
         getDoctorsByOwnId(id:ID): doctors
         getBedsByOwnId(id:ID): beds

         otpVerify(hospitalId: ID , otp: String): TempUser

         
         getBedTypeByHosId(hospitalId: ID, wardName:String):beds

         getAllAdmitPatient(hospitalId:ID): [PatientAdmit]
         getAdmitPatientByOwnId(id:ID): PatientAdmit



         getWardsByHosId(hospitalId:ID): [wards]
         getBedsByHosId(hospitalId:ID): [beds]
         getDoctorsByHosId(hospitalId:ID): [doctors]


    }

    type Mutation {
        createHospital(input: HospitalInput): Hospitals
        updateStatus(id: String!, status: String!): Hospitals

        createWards(id:ID!, WardInput: wardInput): wards
        createDoctors(id:ID!, DoctorInput: doctorInput): doctors
        createBeds(id:ID!, BedInput: bedInput): beds

        createAdmin(AdminInput:adminInput): Admin

        createUser(UserInput: userInput): User

        createTempUser(id:ID!, TempUserInput: userTempInput): TempUser

        updateBeds(hospitalId: ID!, wardName: String!, BedInput: bedInput): beds

        editDoctors(docId: ID!, DoctorInput: doctorInput): doctors
        editBeds(bedId: ID!, BedInput: bedInput): beds

        editWards(wardId:ID,WardInput: wardInput): wards
        deleteWards(wardId:ID): wards
        deleteDoctor(docId:ID): doctors
        deleteBed(bedId:ID): beds


        createPatientAdmit(hospitalId:ID!, bedId:ID, input: PatientAdmitInput): PatientAdmit
        createPatientDischarge(hospitalId:ID!, bedId:ID, input: PatientAdmitInput): PatientAdmit
        deleteAdmitPatient(patientId:ID): PatientAdmit

        updateBedsByWardName(hospitalId: ID, wardName: String, BedInput: bedInput): beds
        updateAdmitBedPlus(bedId:ID, BedInput:bedInput): beds


    }
`)


export default schema;