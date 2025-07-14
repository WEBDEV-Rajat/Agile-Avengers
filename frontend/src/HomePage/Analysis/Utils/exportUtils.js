import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToCSV = (data, filename = "data.csv") => {
  const csv = Papa.unparse(
    Object.entries(data).map(([key, value]) => ({
      Category: key,
      Amount: value,
    }))
  );
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


export const exportToPDF = (data, title = "Export Data", filename = "data.pdf") => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(title, 14, 22);

  const rows = Object.entries(data).map(([key, value]) => [key, `₹${value.toFixed(2)}`]);

  autoTable(doc, {
    startY: 30,
    head: [["Category", "Amount"]],
    body: rows,
  });

  doc.save(filename);
};
