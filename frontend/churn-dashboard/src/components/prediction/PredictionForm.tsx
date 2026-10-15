import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PsychologyIcon
  from "@mui/icons-material/Psychology";

import {
  useState,
} from "react";

import type {
  ChurnPredictionRequest,
  YesNo,
} from "../../types/prediction";


interface PredictionFormProps {

  isLoading: boolean;

  onSubmit:
    (data: ChurnPredictionRequest) =>
      void;

}


const initialForm:
  ChurnPredictionRequest = {

  gender: "Male",

  SeniorCitizen: 0,

  Partner: "No",

  Dependents: "No",

  tenure: 12,

  PhoneService: "Yes",

  MultipleLines: "No",

  InternetService: "DSL",

  OnlineSecurity: "No",

  OnlineBackup: "No",

  DeviceProtection: "No",

  TechSupport: "No",

  StreamingTV: "No",

  StreamingMovies: "No",

  Contract: "Month-to-month",

  PaperlessBilling: "Yes",

  PaymentMethod:
    "Electronic check",

  MonthlyCharges: 70,

  TotalCharges: 840,

};


function PredictionForm({
  isLoading,
  onSubmit,
}: PredictionFormProps) {

  const [
    form,
    setForm,
  ] = useState(initialForm);


  const updateField = <
    K extends keyof ChurnPredictionRequest
  >(
    field: K,
    value: ChurnPredictionRequest[K]
  ) => {

    setForm((previous) => ({
      ...previous,

      [field]: value,
    }));

  };


  const handleSubmit = (
    event:
      React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    onSubmit(form);

  };


  return (

    <Card>

      <CardContent>

        <Stack spacing={3}>

          <Box>

            <Typography
              variant="h5"
            >
              Customer Information
            </Typography>

            <Typography
              sx={{variant:"body2",
              color:"text.secondary",
              mt:0.5}}
            >
              Enter customer information
              to calculate churn risk.
            </Typography>

          </Box>


          <Box
            component="form"
            onSubmit={handleSubmit}
          >

            <Box
              sx={{
                display: "grid",

                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, 1fr)",
                },

                gap: 2.5,
              }}
            >

              <FormControl fullWidth>

                <InputLabel>
                  Gender
                </InputLabel>

                <Select
                  label="Gender"
                  value={form.gender}
                  onChange={(event) =>
                    updateField(
                      "gender",
                      event.target.value as "Male" | "Female"
                    )
                  }
                >

                  <MenuItem value="Male">
                    Male
                  </MenuItem>

                  <MenuItem value="Female">
                    Female
                  </MenuItem>

                </Select>

              </FormControl>


              <FormControl fullWidth>

                <InputLabel>
                  Senior Citizen
                </InputLabel>

                <Select
                  label="Senior Citizen"
                  value={form.SeniorCitizen}
                  onChange={(event) =>
                    updateField(
                      "SeniorCitizen",
                      Number(
                        event.target.value
                      )
                    )
                  }
                >

                  <MenuItem value={0}>
                    No
                  </MenuItem>

                  <MenuItem value={1}>
                    Yes
                  </MenuItem>

                </Select>

              </FormControl>


              <YesNoSelect
                label="Partner"
                value={form.Partner}
                onChange={(value) =>
                  updateField(
                    "Partner",
                    value
                  )
                }
              />


              <YesNoSelect
                label="Dependents"
                value={form.Dependents}
                onChange={(value) =>
                  updateField(
                    "Dependents",
                    value
                  )
                }
              />


              <TextField
                label="Tenure (months)"
                type="number"
                value={form.tenure}
                onChange={(event) =>
                  updateField(
                    "tenure",
                    Number(
                      event.target.value
                    )
                  )
                }
                fullWidth
              />


              <YesNoSelect
                label="Phone Service"
                value={form.PhoneService}
                onChange={(value) =>
                  updateField(
                    "PhoneService",
                    value
                  )
                }
              />


              <FormControl fullWidth>

                <InputLabel>
                  Multiple Lines
                </InputLabel>

                <Select
                  label="Multiple Lines"
                  value={
                    form.MultipleLines
                  }
                  onChange={(event) =>
                    updateField(
                      "MultipleLines",
                      event.target.value as
                        ChurnPredictionRequest[
                          "MultipleLines"
                        ]
                    )
                  }
                >

                  <MenuItem value="No">
                    No
                  </MenuItem>

                  <MenuItem value="Yes">
                    Yes
                  </MenuItem>

                  <MenuItem
                    value="No phone service"
                  >
                    No phone service
                  </MenuItem>

                </Select>

              </FormControl>


              <FormControl fullWidth>

                <InputLabel>
                  Internet Service
                </InputLabel>

                <Select
                  label="Internet Service"
                  value={
                    form.InternetService
                  }
                  onChange={(event) =>
                    updateField(
                      "InternetService",
                      event.target.value as
                        ChurnPredictionRequest[
                          "InternetService"
                        ]
                    )
                  }
                >

                  <MenuItem value="DSL">
                    DSL
                  </MenuItem>

                  <MenuItem value="Fiber optic">
                    Fiber optic
                  </MenuItem>

                  <MenuItem value="No">
                    No
                  </MenuItem>

                </Select>

              </FormControl>


              <InternetOptionSelect
                label="Online Security"
                value={
                  form.OnlineSecurity
                }
                onChange={(value) =>
                  updateField(
                    "OnlineSecurity",
                    value
                  )
                }
              />


              <InternetOptionSelect
                label="Online Backup"
                value={
                  form.OnlineBackup
                }
                onChange={(value) =>
                  updateField(
                    "OnlineBackup",
                    value
                  )
                }
              />


              <InternetOptionSelect
                label="Device Protection"
                value={
                  form.DeviceProtection
                }
                onChange={(value) =>
                  updateField(
                    "DeviceProtection",
                    value
                  )
                }
              />


              <InternetOptionSelect
                label="Tech Support"
                value={
                  form.TechSupport
                }
                onChange={(value) =>
                  updateField(
                    "TechSupport",
                    value
                  )
                }
              />


              <InternetOptionSelect
                label="Streaming TV"
                value={
                  form.StreamingTV
                }
                onChange={(value) =>
                  updateField(
                    "StreamingTV",
                    value
                  )
                }
              />


              <InternetOptionSelect
                label="Streaming Movies"
                value={
                  form.StreamingMovies
                }
                onChange={(value) =>
                  updateField(
                    "StreamingMovies",
                    value
                  )
                }
              />


              <FormControl fullWidth>

                <InputLabel>
                  Contract
                </InputLabel>

                <Select
                  label="Contract"
                  value={form.Contract}
                  onChange={(event) =>
                    updateField(
                      "Contract",
                      event.target.value as
                        ChurnPredictionRequest[
                          "Contract"
                        ]
                    )
                  }
                >

                  <MenuItem
                    value="Month-to-month"
                  >
                    Month-to-month
                  </MenuItem>

                  <MenuItem
                    value="One year"
                  >
                    One year
                  </MenuItem>

                  <MenuItem
                    value="Two year"
                  >
                    Two year
                  </MenuItem>

                </Select>

              </FormControl>


              <YesNoSelect
                label="Paperless Billing"
                value={
                  form.PaperlessBilling
                }
                onChange={(value) =>
                  updateField(
                    "PaperlessBilling",
                    value
                  )
                }
              />


              <FormControl fullWidth>

                <InputLabel>
                  Payment Method
                </InputLabel>

                <Select
                  label="Payment Method"
                  value={
                    form.PaymentMethod
                  }
                  onChange={(event) =>
                    updateField(
                      "PaymentMethod",
                      event.target.value as
                        ChurnPredictionRequest[
                          "PaymentMethod"
                        ]
                    )
                  }
                >

                  <MenuItem
                    value="Electronic check"
                  >
                    Electronic check
                  </MenuItem>

                  <MenuItem
                    value="Mailed check"
                  >
                    Mailed check
                  </MenuItem>

                  <MenuItem
                    value={
                      "Bank transfer (automatic)"
                    }
                  >
                    Bank transfer
                  </MenuItem>

                  <MenuItem
                    value={
                      "Credit card (automatic)"
                    }
                  >
                    Credit card
                  </MenuItem>

                </Select>

              </FormControl>


              <TextField
                label="Monthly Charges"
                type="number"
                value={
                  form.MonthlyCharges
                }
                onChange={(event) =>
                  updateField(
                    "MonthlyCharges",
                    Number(
                      event.target.value
                    )
                  )
                }
                fullWidth
              />


              <TextField
                label="Total Charges"
                type="number"
                value={
                  form.TotalCharges
                }
                onChange={(event) =>
                  updateField(
                    "TotalCharges",
                    Number(
                      event.target.value
                    )
                  )
                }
                fullWidth
              />

            </Box>


            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={
                <PsychologyIcon />
              }
              disabled={isLoading}
              sx={{
                mt: 3,
              }}
            >

              {isLoading
                ? "Predicting..."
                : "Predict Churn"}

            </Button>

          </Box>

        </Stack>

      </CardContent>

    </Card>

  );

}


interface YesNoSelectProps {

  label: string;

  value: YesNo;

  onChange:
    (value: YesNo) => void;

}


function YesNoSelect({
  label,
  value,
  onChange,
}: YesNoSelectProps) {

  return (

    <FormControl fullWidth>

      <InputLabel>
        {label}
      </InputLabel>

      <Select
        label={label}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value as YesNo
          )
        }
      >

        <MenuItem value="Yes">
          Yes
        </MenuItem>

        <MenuItem value="No">
          No
        </MenuItem>

      </Select>

    </FormControl>

  );

}


type InternetOption =
  | "Yes"
  | "No"
  | "No internet service";


interface InternetOptionSelectProps {

  label: string;

  value: InternetOption;

  onChange:
    (value: InternetOption) => void;

}


function InternetOptionSelect({
  label,
  value,
  onChange,
}: InternetOptionSelectProps) {

  return (

    <FormControl fullWidth>

      <InputLabel>
        {label}
      </InputLabel>

      <Select
        label={label}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value as InternetOption
          )
        }
      >

        <MenuItem value="Yes">
          Yes
        </MenuItem>

        <MenuItem value="No">
          No
        </MenuItem>

        <MenuItem
          value="No internet service"
        >
          No internet service
        </MenuItem>

      </Select>

    </FormControl>

  );

}


export default PredictionForm;