import { Steps, Panel, ButtonGroup, Button } from "rsuite";
import { useThemeContext } from "../../../context/themeContext/Theme.Context";

const LANGUAGE = {
  EN: {
    A: "Previous",
    B: "Next",
  },
  ES: {
    A: "Anterior",
    B: "Siguiente",
  }
};

export interface IStepItemOfStepper {
  title: string;
  description: string;
  icon?: JSX.Element | undefined;
  header?: string | undefined;
};

interface IStepperWithDescriptionProps {
  step: number;
  onStep: (newStep: number) => void;
  stepItems: IStepItemOfStepper[];
  vertical?: boolean | undefined;
  content: JSX.Element;
};

const StepperWithDescription: React.FC<IStepperWithDescriptionProps> = ({ step, stepItems, onStep, vertical, content, }) => {
  const { language, } = useThemeContext();

  const onPrevious = () => {
    onStep(step - 1);
  };

  const onNext = () => {
    onStep(step + 1);
  };

  return (
    <>
      <Steps vertical={!!vertical} current={step}>
        {stepItems.map((item, i) => (
          <Steps.Item 
            onClick={() => onStep(i)}
            key={i} 
            title={item.title} 
            description={item.description} 
            icon={item.icon} 
            style={{ cursor: "pointer" }}
          />
        ))}
      </Steps>
      <hr />
      <Panel header={stepItems[step].header || stepItems[step].title}>
        {content}
      </Panel>
      <hr />
      <ButtonGroup>
        <Button onClick={onPrevious} disabled={step === 0}>
          {LANGUAGE[language].A}
        </Button>
        <Button onClick={onNext} disabled={step === 3}>
          {LANGUAGE[language].B}
        </Button>
      </ButtonGroup>
    </>
  );
};

export default StepperWithDescription;