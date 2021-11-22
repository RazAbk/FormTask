import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";

export const Form = () => {

    const [formState, setFormState] = useState(null)

    useEffect(() => {
        setFormState({
            firstName: '',
            lastName: '',
            fullName: '',
            mobilePhoneNumber: '',
            socialSecurityNumber: '',
            email: '',
            typeOfFormToSend: 'fund-withdrawal',
            fundName: '',
            accountNumber: '',
            fundNumber: '',
            employmentType: 'Employee',
            withdrawalAmount: '',
            withdrawalType: 'full-withdrawal',
            automatedMonthlyWithdrawal: {
                paymentWithdrawal: false,
                correspondingToALoan: false,
                eligibleForTaxRefund: false,
            }

        })
    }, [])

    const handleChange = (ev) => {
        const currentState = JSON.parse(JSON.stringify(formState))

        if(ev.target.name === 'fullName'){
            const fullName = ev.target.value
            const wordsCount = fullName.match(/(\w+)/g).length
            if(wordsCount === 1){
                currentState.firstName = fullName
            } else if(wordsCount === 2){
                currentState.firstName = fullName.split(' ')[0]
                currentState.lastName = fullName.split(' ')[1]
            }
            currentState.fullName = currentState.firstName + ' ' + currentState.lastName
        }else if(ev.target.name === 'firstName' || ev.target.name === 'lastName') {
            currentState[ev.target.name] = ev.target.value
            currentState.fullName = currentState.firstName + ' ' + currentState.lastName
        }else if(ev.target.name === 'automatedMonthlyWithdrawal'){
            if(ev.target.value === 'payment-withdrawal'){
                currentState.automatedMonthlyWithdrawal.paymentWithdrawal = !currentState.automatedMonthlyWithdrawal.paymentWithdrawal
            }
            if(ev.target.value === 'corresponding-to-a-loan'){
                currentState.automatedMonthlyWithdrawal.correspondingToALoan = !currentState.automatedMonthlyWithdrawal.correspondingToALoan
            }
        } else if(ev.target.name === 'eligibleForTaxRefund'){
            if(ev.target.value === 'true'){
                currentState.automatedMonthlyWithdrawal.eligibleForTaxRefund = true
            } else {
                currentState.automatedMonthlyWithdrawal.eligibleForTaxRefund = false
            }
        } else{
            currentState[ev.target.name] = ev.target.value
        }

        setFormState(currentState)
    }

    const submitForm = (ev) => {
        ev.preventDefault()

        console.log(formState)

        const test = {
            firstName: false,
            lastName: false,
            socialSecurityNumber: false,
            fundName: false,
            withdrawalAmount: true
        }

        const namesTest = /^[a-zA-Z_ ]*$/
        test.firstName =  namesTest.test(formState.firstName)
        test.lastName =  namesTest.test(formState.lastName)

        const socialSecurityNumberTest = /^(([0-9]){3}\-([0-9]){2}\-([0-9]){4})$/
        test.socialSecurityNumber = socialSecurityNumberTest.test(formState.socialSecurityNumber)

        const fundNameTest = /^[A-Za-z0-9 _]*[A-Za-z]+[A-Za-z0-9 _]*$/
        test.fundName = fundNameTest.test(formState.fundName)

        if(formState.withdrawalAmount){
            if(formState.withdrawalAmount > 99000 || formState.withdrawalAmount < 0) test.withdrawalAmount = false
        }

        let isValid = true
        let noValidMsg = ''

        for(const key in test){
            if(!test[key]){
                isValid = false
                switch(key){
                    case 'firstName':
                        noValidMsg += '\n• first name must consist only english letters'
                        break;
                    case 'lastName':
                        noValidMsg += '\n• last name must consist only english letters'
                        break;
                    case 'socialSecurityNumber':
                        noValidMsg += '\n• social security number is not in the right format'
                        break;
                    case 'fundName':
                        noValidMsg += '\n• fund name must consist only english letters and numbers'
                        break;
                    case 'withdrawalAmount':
                        noValidMsg += '\n• withdrawal amount must be between 0 - 99,000'
                        break;
                    default:
                        noValidMsg += ''
                }
            }
        }

        if(isValid){
            console.log(formState)
            alert('your form was submitted successfully')
        } else {
            console.log(noValidMsg)
            alert(`please correct the form: ${noValidMsg}`)
        }

    }

    const clearForm = (ev) => {
        ev.preventDefault()
        setFormState({
            firstName: '',
            lastName: '',
            fullName: '',
            mobilePhoneNumber: '',
            socialSecurityNumber: '',
            email: '',
            typeOfFormToSend: 'fund-withdrawal',
            fundName: '',
            accountNumber: '',
            fundNumber: '',
            employmentType: 'Employee',
            withdrawalAmount: '',
            withdrawalType: 'full-withdrawal',
            automatedMonthlyWithdrawal: {
                paymentWithdrawal: false,
                correspondingToALoan: false,
                eligibleForTaxRefund: false,
            }

        })
    }

    if(!formState) return <h1>Loading...</h1>

  return (
    <div className="form">
      <h1>form</h1>
      <Box
        onChange={handleChange}
        component="form"
        sx={{"& > :not(style)": { m: 1, width: "100%" },}}
        validate
        autoComplete="off"
        className="form-cmp"
      >
        <div className="names-fields">
          <TextField id="first-name" type="text" value={formState.firstName} name="firstName" label="First name" variant="standard" />
          <TextField id="last-name" type="text" value={formState.lastName} name="lastName" label="Last name" variant="standard" />
        </div>
        <TextField id="full-name" type="text" value={formState.fullName} name="fullName" label="Full name" variant="standard" />
        <TextField id="socialSecurityNumber" type="text" value={formState.socialSecurityNumber} name="socialSecurityNumber" label="Social Security Number (DDD-DD-DDDD)" variant="standard"/>
        <TextField id="mobilePhoneNumber" type="number" value={formState.mobilePhoneNumber} name="mobilePhoneNumber" label="Mobile Phone Number" variant="standard" />
        <TextField id="Email" type="email" value={formState.email} name="email" label="Email" variant="standard" />

        <h2>Type of forms to send</h2>
        <FormControl onChange={handleChange} component="fieldset" className="form-radio-btns">
          <RadioGroup aria-label="gender" value={formState.typeOfFormToSend} name="typeOfFormToSend" >
            <FormControlLabel value="fund-withdrawal-request" control={<Radio />} label="Fund withdrawal request" />
            <FormControlLabel value="fund-transfer-cancel-request" control={<Radio />} label="Fund transfer cancel request" />
            <FormControlLabel value="life-insurance-onboarding-form" control={<Radio />} label="Life insurance onboarding form" />
          </RadioGroup>
        </FormControl>

        <TextField id="fundName" type="text" value={formState.fundName} name="fundName" label="Fund Name" variant="standard" />
        <TextField id="standard-basic" type="number" value={formState.accountNumber} name="accountNumber" label="Account Number" variant="standard" />
        <TextField id="standard-basic" type="number" value={formState.fundNumber} name="fundNumber" label="Fund Number" variant="standard" />

        <h2>Employment type</h2>
        <FormControl component="fieldset" className="form-radio-btns">
          <RadioGroup aria-label="employment-type" defaultValue="Employee" value={formState.employmentType}  name="employmentType">
            <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
            <FormControlLabel value="Independent" control={<Radio />} label="Independent" />
          </RadioGroup>
        </FormControl>



        <h2>Withdrawal type</h2>
        <FormControl component="fieldset" className="form-radio-btns">
          <RadioGroup onChange={handleChange} aria-label="withdrawalType" defaultValue="full-withdrawal" value={formState.withdrawalType} name="withdrawalType" >
            <FormControlLabel value="full-withdrawal" control={<Radio />} label="Full withdrawal" />
            <FormControlLabel value="partial-withdrawal" control={<Radio />} label="Partial withdrawal" />

            {formState.withdrawalType === 'partial-withdrawal' && 
                <TextField id="partial-withdrawal" type="number" value={formState.withdrawalAmount} name="withdrawalAmount" label="Withdrawal Amount" variant="standard"/>
            }

            <FormControlLabel value="automated-monthly-withdrawal" control={<Radio />}  label="Automated monthly withdrawal" />

            {formState.withdrawalType === 'automated-monthly-withdrawal' &&
                <FormGroup className="inner-checkboxes">
                    <FormControlLabel onChange={handleChange} name="automatedMonthlyWithdrawal" value="payment-withdrawal" control={<Checkbox />} label="Payment withdrawal" />
                        {formState.automatedMonthlyWithdrawal.paymentWithdrawal &&
                            <RadioGroup className="inner-checkboxes" onChange={handleChange} aria-label="withdrawalType" defaultValue={false} value={formState.automatedMonthlyWithdrawal.eligibleForTaxRefund} name="eligibleForTaxRefund" >
                                <FormControlLabel value={true} control={<Radio />} label="Eligible for tax refund" />
                                <FormControlLabel value={false} control={<Radio />} label="Not eligible for tax refund" />
                            </RadioGroup>
                        }
                         
                    <FormControlLabel onChange={handleChange} name="automatedMonthlyWithdrawal" value="corresponding-to-a-loan" control={<Checkbox />} label="Corresponding to a loan" />
                </FormGroup>
            }
            
          </RadioGroup>
        </FormControl>

        <Stack spacing={2} direction="row" className="action-btns">
          <Button onClick={clearForm} variant="contained" className="clear-btn">Clear Form</Button>
          <Button onClick={submitForm} variant="contained" className="send-btn">Send Form</Button>
        </Stack>

      </Box>
    </div>
  );
};
