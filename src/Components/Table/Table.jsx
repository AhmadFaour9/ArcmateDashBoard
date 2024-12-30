import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Papa from "papaparse";
import "./Table.css";

const Table = () => {
  const counts = useSelector((state) => state.item.counts);
  const { t } = useTranslation();

  if (!counts) {
    return <p>Loading data...</p>;
  }

  // Export entire component as a PDF (captured as an image)
  const exportToPDF = async () => {
    const element = document.getElementById("table-container"); // ID of the component to capture
    const buttons = document.querySelector("#buttons"); // Select the button container
    const buttons1 = document.querySelector("#buttons1"); // Select the button container

    // Temporarily hide the buttons
    buttons.style.display = "none";
    buttons1.style.display = "none";
    // Delay to ensure the browser has time to apply the style changes
    await new Promise((resolve) => setTimeout(resolve, 100));
  
    html2canvas(element, { scale: 2 }) // Scale for higher resolution
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
  
        // Calculate the image dimensions to fit into A4
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("data.pdf");
      })
      .catch((err) => {
        console.error("Failed to export as PDF:", err);
      })
      .finally(() => {
        // Restore the visibility of the buttons
        buttons.style.display = "flex"; 
        buttons1.style.display = "flex";
      });
  };

  // Export data as CSV
  const exportToCSV = () => {
    const csvData = [
      ["#", t("reportTableColumns.documents"), t("reportTableColumns.files"), t("reportTableColumns.filePages")],
      [1, counts.documents, counts.files, counts.pages],
    ];

    const csv = Papa.unparse(csvData);
    const BOM = "\uFEFF"; // Add BOM for UTF-8 support
    const csvWithBOM = BOM + csv;
    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
  };

  return (
    <div id="table-container" className="table1">
      {/* Header Title */}
      <h1 className="text-center">{t("reportTableTitle")}</h1>

      {/* Table */}
      <div className="table2">
        <table className="table">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">{t("reportTableColumns.documents")}</th>
              <th scope="col">{t("reportTableColumns.files")}</th>
              <th scope="col">{t("reportTableColumns.filePages")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{counts.documents}</td>
              <td>{counts.files}</td>
              <td>{counts.pages}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons for CSV and PDF */}
      <div className="d-flex justify-content-end mt-3" >
        <button  id="buttons" className="btn btn-success mx-2" onClick={exportToCSV}>
          Export to CSV
        </button>
        <button  id="buttons1" className="btn btn-primary" onClick={exportToPDF}>
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default Table;
