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

document.getElementById('searchButton').addEventListener('click', searchStudents);

function searchStudents() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    const transaction = db.transaction([storeName], "readonly");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.openCursor();

    request.onerror = function(event) {
        console.error("Error in cursor request: " + event.target.error);
    };

    request.onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            const student = cursor.value;
            if (
                student.admissionNo.toLowerCase().includes(searchInput) ||
                student.studentName.toLowerCase().includes(searchInput) ||
                student.guardianName.toLowerCase().includes(searchInput)
            ) {
                const card = createStudentCard(student);
                searchResults.appendChild(card);
            }
            cursor.continue();
        }
    };
}

function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
        <div class="student-card-header">
            <h3>${student.studentName}</h3>
            <div>
                <i data-feather="edit-2" onclick="editStudent('${student.admissionNo}')"></i>
                <i data-feather="trash-2" onclick="deleteStudent('${student.admissionNo}')"></i>
            </div>
        </div>
        <div class="student-card-content">
            <p><i data-feather="book"></i> Admission No: ${student.admissionNo}</p>
            <p><i data-feather="user"></i> Guardian: ${student.guardianName}</p>
            <p><i data-feather="phone"></i> Phone: ${student.guardianPhone}</p>
            <p><i data-feather="home"></i> Address: ${student.address}</p>
        </div>
    `;
    feather.replace();
    return card;
}

function editStudent(admissionNo) {
    console.log("Edit student: " + admissionNo);
    // Implement edit functionality
}

function deleteStudent(admissionNo) {
    console.log("Delete student: " + admissionNo);
    // Implement delete functionality
}