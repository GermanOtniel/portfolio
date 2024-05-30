import { Steps, Panel, ButtonGroup, Button } from "rsuite";

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
          Previous
        </Button>
        <Button onClick={onNext} disabled={step === 3}>
          Next
        </Button>
      </ButtonGroup>
    </>
  );
};

export default StepperWithDescription;