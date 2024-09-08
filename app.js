let db;

const dbName = "StudentManagementDB";
const storeName = "students";

const request = indexedDB.open(dbName, 1);

request.onerror = function(event) {
    console.error("Database error: " + event.target.error);
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Database opened successfully");
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore(storeName, { keyPath: "admissionNo" });
    console.log("Object store created");
};

document.getElementById('studentForm').addEventListener('submit', addStudent);

function addStudent(e) {
    e.preventDefault();

    const student = {
        admissionNo: document.getElementById('admissionNo').value,
        studentName: document.getElementById('studentName').value,
        guardianName: document.getElementById('guardianName').value,
        guardianPhone: document.getElementById('guardianPhone').value,
        address: document.getElementById('address').value
    };

    const transaction = db.transaction([storeName], "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.add(student);

    request.onerror = function(event) {
        console.error("Error adding student: " + event.target.error);
    };

    request.onsuccess = function(event) {
        console.log("Student added successfully");
        document.getElementById('studentForm').reset();
    };
}