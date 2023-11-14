import React, { FC } from 'react';

// Define the prop types for your component
interface BreadProps {
  steps: any;
  currentStep: number;
}

// Create your functional component using the FC (Functional Component) type
const Breadcrumb: FC<BreadProps> = ({ steps, currentStep }) => {
  const prev_color = 'border-black text-black';
  const cur_color = 'border-custom_purple text-custom_purple';
  const next_color = 'border-gray-400 text-gray-400'

  return (
    <div className="flex flex-row justify-center">
      {steps.map((step: number, index: number) => (
        <div className='flex flex-row' key={index}>
          <div 
            className={`flex flex-col w-16 h-full justify-center
            ${index === 0 ? 'hidden' : ''}
            `}
          >
            <hr className={`border-2
              ${index === currentStep ? cur_color : ''}
              ${index < currentStep ? prev_color : ''}
              ${index > currentStep ? next_color : ''}
            `} 
          />
          </div>
          <div
            key={index}
            className={`flex flex-col p-6 text-center
            ${index === currentStep ? cur_color : ''}
            ${index < currentStep ? prev_color : ''}
            ${index > currentStep ? next_color : ''}
            `}
          >
            <p className="font-bebas text-xl">{index + 1}</p>
            <p className="font-bebas text-xl">{step}</p> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
