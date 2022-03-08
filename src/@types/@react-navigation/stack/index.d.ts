interface SignUpSecondStepProps {
  user: {
      name: string;
      email: string;
      driverLicense: string;
  }
}
interface ConfirmationProps {
  title: string;
  message: string;
  nextScreen: any;
}

declare namespace ReactNavigation {
    export interface RootParamList {
      Home: undefined
      CarDetails: undefined
      Scheduling: undefined
      SchedulingDetails: undefined
      Confirmation: ConfirmationProps
      SignUpFirstStep: undefined
      SignUpSecondStep: SignUpSecondStepProps
      MyCars: undefined
    }
  }