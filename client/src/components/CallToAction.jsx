import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more javascript?</h2>
        <p className="text-gray-500 py-2">Checkout the following resources wiht 100 javascript projects</p>
        <Button
          gradientDuoTone={"purpleToPink"}
          className="rounded-tl-xl rounded-bl-none"
        >
          <a target="_blank" rel="noopener noreferrer" href="#">
            Learn More
          </a>
        </Button>
      </div>

      <div className="flex-1 p-7">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tRffe3TQL6kW5wcGlb-Tn-72xNkEqAagFR4gYBLk4b74kLr49Y6w5rH7j2ZGpzKj5rY&usqp=CAU" />
      </div>
    </div>
  );
}
