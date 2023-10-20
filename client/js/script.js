const addButton = document.getElementById("add-button");
const addNotesBox = document.getElementById("add-notes-box");
const crossButton = document.getElementById("cross-button");
const submitButton = document.getElementById("submit-button");
const noteTitle = document.querySelector(".note-title");
const noteDescription = document.querySelector(".note-description");
const allNotesContainer = document.querySelector(".all-notes-container");
const updateNoteBox = document.getElementById("update-notes-box");
const updateCrossButton = document.getElementById("update-cross-button");
const updateButton = document.getElementById("update-button");
const updateNoteTitle = document.querySelector(".update-note-title");
const updateNoteDescription = document.querySelector(".update-note-description");

let updateNoteId;

addButton.addEventListener('click', () => {
    addNotesBox.classList.remove("hidden");
});

crossButton.addEventListener("click", () => {
    addNotesBox.classList.add("hidden");
});

updateCrossButton.addEventListener("click", () => {
    updateNoteBox.classList.add("hidden");
});

const deleteNote = async (noteId) => {
    try {
        const response = await fetch(`http://localhost:7800/api/notes/get-note/${noteId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const deletedNote = document.getElementById(noteId);
            deletedNote.remove();
            alert("Deleted Successfully");
        } else {
            console.log("Failed to delete note");
        }
    } catch (error) {
        console.log('Error deleting note:', error);
    }
}

const updateNote = (id) => {
    updateNoteId = id;
    updateNoteBox.classList.toggle("hidden");
}

updateButton.addEventListener("click", async () => {
    alert(updateNoteId);
    if (updateNoteTitle.value !== "" || updateNoteDescription.value !== "") {
        try {
            const updatedData = {
                title: updateNoteTitle.value,
                description: updateNoteDescription.value
            }

            const response = await fetch(`http://localhost:7800/api/notes/get-note/${updateNoteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                alert("Update successfully");
            }

        } catch (error) {
            console.log('Error in Updating note', error)
        }
    } else {
        alert("You have to enter something if you want to update");
    }


});


const getNote = async (id) => {
    try {
        const response = await fetch(`http://localhost:7800/api/notes/get-note/${id}`).then((response) => response.json());
        console.log(response);
        allNotesContainer.innerHTML += `<div class="w-[15rem] h-[15rem] bg-white rounded-lg flex flex-col p-4 single-note" id=${id}>
                                            <div class="flex flex-row justify-between">
                                                <span class="text-lg font-bold">${response.note.createdAt.split("T", 1)}</span>
                                                <div class="flex gap-5">
                                                   <img src="./images/update.svg" alt="update icon" width="20vw" onclick="updateNote('${id}')"/>
                                                   <img src="./images/cross.svg" alt="cross" width="20vw" onclick="deleteNote('${id}')"/>
                                                </div>
                                            </div>
                                            <div>
                                            <p class="text-xl font-bold mt-3 text-blue-900">${response.note.title.toUpperCase()}</p>
                                            <p class="text-lg font-medium mt-4 text-gray-400">${response.note.description}</p>
                                            </div>
                                        </div>`

    } catch (error) {
        console.log(error);
    }
}

submitButton.addEventListener("click", async () => {
    if (noteTitle.value !== "" && noteDescription.value !== "") {
        console.log(noteTitle.value);
        console.log(noteDescription.value);
        const formData = {
            title: noteTitle.value,
            description: noteDescription.value
        }
        await fetch(`http://localhost:7800/api/notes/create-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            let id;
            response.json().then(data => {
                console.log("Data stored", data);
                id = data.Notes._id;
                getNote(id);
            })
            noteTitle.value = "";
            noteDescription.value = "";
            addNotesBox.classList.add("hidden");

        }).catch((error) => {
            console.log(error);
        })
    } else {
        alert("All fields are mandatory!!");
    }
});


