import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createTravelInfo, employeePersonalResponce, travelInfo, updatePersoalInfoRequest } from 'src/app/models/user-details-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  isAuthenticated: boolean = false;
  presonalInfo?: employeePersonalResponce;
  travelInfo: travelInfo[] = [];

  ngOnInit(): void {
    this.checkAuthentication();
    this.addTravelInfo();
  }
  constructor(
    private authService: AuthenticationService,
    private api: UserDetailsService,
    private formBuilder: FormBuilder,
  ) { }

  personalinfoRequestFrom = this.formBuilder.group({
    dateOfBirth: this.formBuilder.control(new Date()),
    gender: this.formBuilder.control('male'),
    maritalStatus: this.formBuilder.control('single'),
    bloodGroup: this.formBuilder.control(''),
    anyDiseases: this.formBuilder.control(''),
    contactNumber: [this.formBuilder.control(BigInt(0)), [Validators.minLength(10), Validators.maxLength(10)]],
    alternateNumber: [this.formBuilder.control(BigInt(0)), [Validators.minLength(10), Validators.maxLength(10)]],
    accountNumber: [this.formBuilder.control(''), [Validators.minLength(11), Validators.maxLength(11),Validators.pattern("^[0-9]*$")]],
    panCardNumber: [this.formBuilder.control(''), [Validators.minLength(11), Validators.maxLength(11)]],
    presentAddress: this.formBuilder.control(''),
    permanentAddress: this.formBuilder.control(''),
    providentFundNumber: this.formBuilder.control(0),
    nsrNumber: this.formBuilder.control(0),
    companyMail: [this.formBuilder.control(''), [Validators.email]],
    personalMail: [this.formBuilder.control(''), [Validators.email]],
    messengers: this.formBuilder.control(''),
    passportNumber: this.formBuilder.control(''),
    dateOfIssue: this.formBuilder.control(new Date()),
    placeOfIssue: this.formBuilder.control(''),
    nameInPassport: this.formBuilder.control(''),
    validUpto: this.formBuilder.control(new Date())
  });

  travelInfoFormGroup = this.formBuilder.group({
    travelInfoGroup: this.formBuilder.group({
      visaId: this.formBuilder.control(Number()),
      countryName: [this.formBuilder.control(''), [Validators.required]],
      visaType: [this.formBuilder.control(''), [Validators.required]],
      visaValidFor: [this.formBuilder.control(new Date()), [Validators.required]],
    }),
    travelInfoFormArray: this.formBuilder.array([])
  });

  get travelInfoFormArray() {
    return this.travelInfoFormGroup.controls["travelInfoFormArray"] as FormArray;
  }

  async checkAuthentication(): Promise<void> {
    this.isAuthenticated = await this.authService.canActivate();
    const id = localStorage.getItem('employeeId');
    if (this.isAuthenticated && id != null) {
      // Get Employee Details
      this.api.getPresonalinfo(id).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            this.presonalInfo = responce.responce;
            this.updateFormValues();
            // console.log(responce.responce);
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error fetching employee details: ", error);
        }
      });
      // Get Travel info
      this.api.gettravelInfo(id).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            this.travelInfo = responce.responce;
            this.updateTravelInfo();
            // console.log(responce.responce);
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error fetching employee details: ", error);
        }
      });
    }
  }

  updatePersonalInfo() {
    this.checkAuthentication();
    const id = localStorage.getItem('employeeId');
    if (id != null) {
      var request: updatePersoalInfoRequest = {
        employeeId: id,
        dateOfBirth: new Date(this.personalinfoRequestFrom.value.dateOfBirth ?? ''),
        gender: Boolean(this.personalinfoRequestFrom.value.gender == 'male'),
        maritalStatus: Boolean(this.personalinfoRequestFrom.value.gender == 'married'),
        bloodGroup: this.personalinfoRequestFrom.value.bloodGroup ?? null,
        anyDisease: this.personalinfoRequestFrom.value.anyDiseases ?? null,
        contactNumber: this.personalinfoRequestFrom.value.contactNumber ?? null,
        alternateNumber: this.personalinfoRequestFrom.value.alternateNumber ?? null,
        accountNumber: this.personalinfoRequestFrom.value.accountNumber ?? null,
        panCardNumber: this.personalinfoRequestFrom.value.panCardNumber ?? null,
        presentAddress: this.personalinfoRequestFrom.value.permanentAddress ?? null,
        permanentAddress: this.personalinfoRequestFrom.value.presentAddress ?? null,
        providentFundNumber: this.personalinfoRequestFrom.value.providentFundNumber ?? null,
        nsrNumber: this.personalinfoRequestFrom.value.nsrNumber ?? null,
        companyMail: this.personalinfoRequestFrom.value.companyMail ?? null,
        personalMail: this.personalinfoRequestFrom.value.personalMail ?? null,
        messengers: this.personalinfoRequestFrom.value.messengers ?? null,
        passportNumber: this.personalinfoRequestFrom.value.passportNumber ?? null,
        dateOfIssue: new Date(this.personalinfoRequestFrom.value.dateOfIssue ?? ''),
        placeOfIssue: this.personalinfoRequestFrom.value.placeOfIssue ?? null,
        nameInPassport: this.personalinfoRequestFrom.value.nameInPassport ?? null,
        validUpto: new Date(this.personalinfoRequestFrom.value.validUpto ?? '')
      };
      this.api.updatePersonalInfo(request).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            alert(responce.responce);
            this.checkAuthentication();
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error updating employee details: ", error);
        }
      });
    }
  }
  addTravelInfo() {
    const travelInfoForm = this.formBuilder.group({
      visaId: this.formBuilder.control(Number()),
      countryName: this.formBuilder.control(null),
      visaType: this.formBuilder.control(null),
      visaValidFor: this.formBuilder.control(new Date())
    });

    this.travelInfoFormArray.push(travelInfoForm);
  }
  saveTravelInfo(index: number) {
    this.checkAuthentication();
    // console.log("Value at Index", index, " is ", this.travelInfoFormArray.getRawValue()[index],"\n id: ", localStorage.getItem('employeeId'));
    var travelInfo = this.travelInfoFormArray.getRawValue()[index];
    const id = localStorage.getItem('employeeId');
    if (travelInfo.visaId == 0 && id != null && travelInfo.countryName != '' && travelInfo.countryName != null && travelInfo.visaType != '' && travelInfo.visaType != null) {
      // create travel info
      var request: createTravelInfo = {
        employeeId: id,
        countryName: travelInfo.countryName,
        visaType: travelInfo.visaType,
        visaValidFor: travelInfo.visaValidFor
      };
      this.api.createCountryVisaInfo(request).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            this.checkAuthentication();
            alert(responce.responce);
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error updating employee travel info: ", error);
        }
      });
    } else if (travelInfo.visaId != 0 && travelInfo.visaId != '' && travelInfo.visaId != null && travelInfo.countryName != '' && travelInfo.countryName != null && travelInfo.visaType != '' && travelInfo.visaType != null) {
      // update travel info

      this.api.updateCountryVisaInfo(travelInfo).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            alert(responce.responce);
            this.checkAuthentication();
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error updating employee travel info: ", error);
        }
      });
    }else if(travelInfo.countryName == '' || travelInfo.countryName == null || travelInfo.visaType == '' || travelInfo.visaType == null){
      alert("Data is not valid, Please try again!");
    }
  }
  removeTravelInfo(index: number) {
    var id = this.travelInfoFormArray.getRawValue()[index].visaId;
    if (id != 0 && id != '' && id != null) {
      // delete travel info
      this.api.deleteCountryVisaInfo(id).subscribe({
        next: (responce) => {
          if (!responce.isError) {
            alert(responce.responce);
            this.checkAuthentication();
          }
          else {
            console.log(responce.errorMessage);
          }
        },
        error: (error) => {
          console.log("Error deleting employee travel info: ", error);
        }
      });
    }
    this.travelInfoFormArray.removeAt(index);
  }

  updateFormValues() {
    this.personalinfoRequestFrom.patchValue({
      dateOfBirth: this.presonalInfo?.dateOfBirth,
      gender: this.presonalInfo?.gender ? "male" : "female",
      maritalStatus: this.presonalInfo?.maritalStatus ? "married" : "single",
      bloodGroup: this.presonalInfo?.bloodGroup,
      anyDiseases: this.presonalInfo?.anyDiseases,
      contactNumber: this.presonalInfo?.contactNumber,
      alternateNumber: this.presonalInfo?.alternateNumber,
      accountNumber: this.presonalInfo?.accountNumber,
      panCardNumber: this.presonalInfo?.panCardNumber,
      presentAddress: this.presonalInfo?.presentAddress,
      permanentAddress: this.presonalInfo?.permanentAddress,
      providentFundNumber: this.presonalInfo?.providentFundNumber,
      nsrNumber: this.presonalInfo?.nsrNumber,
      companyMail: this.presonalInfo?.companyMail,
      personalMail: this.presonalInfo?.personalMail,
      messengers: this.presonalInfo?.messengers,
      passportNumber: this.presonalInfo?.passportNumber,
      dateOfIssue: this.presonalInfo?.dateOfIssue,
      placeOfIssue: this.presonalInfo?.placeOfIssue,
      nameInPassport: this.presonalInfo?.nameInPassport,
      validUpto: this.presonalInfo?.validUpto
    });
  }

  updateTravelInfo() {
    this.travelInfoFormArray.clear();
    this.travelInfo.forEach(travel => {
      const travelInfoFormGroup = this.formBuilder.group({
        visaId: this.formBuilder.control(travel.visaId),
        countryName: this.formBuilder.control(travel.countryName),
        visaType: this.formBuilder.control(travel.visaType),
        visaValidFor: this.formBuilder.control(new Date(travel.visaValidFor))
      });
      this.travelInfoFormArray.push(travelInfoFormGroup);
    });
  }
}
