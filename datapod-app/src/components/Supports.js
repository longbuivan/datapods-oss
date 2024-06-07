import { ExternalLinkIcon, CheckIcon, XIcon } from "@heroicons/react/outline";

export default function getSupportAndContribution() {

  return (
    <table className="w-full shadow-md">
      <tbody>
        <tr>
          <td className="p-4 border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Basic (Free)</h3>
            <div className="flex justify-center items-center">
              <ul className="list-disc pl-8 mt-4 px-4">
                <li className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Customable</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>No Limitations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>No Hidden Cost</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Open Source</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>No Underline</span>
                </li>
                <a
                  href="https://www.buymeacoffee.com/longdatadevlog"
                  className="flex items-center"
                >
                  <img
                    src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                    alt="Buy Me A Coffee"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <span className="text-gray-300 font-italic md-2 dark:text-gray-700 dark: font-italic ml-2">
                    {" "}
                    - longbui.ddl
                  </span>
                </a>
              </ul>
            </div>
          </td>
          <td className="p-4 border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Pro ($$ per month)</h3>
            <div className="flex justify-center items-center">
              <ul className="list-disc pl-8 mt-4">
                <li className="flex items-center space-x-2">
                  <XIcon className="h-5 w-5 text-green-500" />
                  <span>Environment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Services Hosted</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Priority Support</span>
                </li>
                {/* <li className="flex items-center space-x-2">
                        <CheckIcon className="h-5 w-5 text-green-500" />
                        <span>Less Maintenance</span>
                        </li> */}
                <li className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Being Monitored</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Access Beta Feature</span>
                </li>
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
                >
                  <ExternalLinkIcon className="h-5 w-5" />
                  <span>Contact</span>
                </a>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
