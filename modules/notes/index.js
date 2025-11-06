/**
 * Notes Module
 * Módulo de notas con almacenamiento local
 */

export default {
  name: 'Notas',
  description: 'Gestor de notas',
  icon: '📝',

  init: async function() {
    console.log('Notes module initialized');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    return { notes };
  },

  render: async function(container) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold">📝 Notas</h2>
          <button id="add-note-btn" class="btn btn-primary">Nueva Nota</button>
        </div>

        <!-- Notes Grid -->
        <div id="notes-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${notes.length === 0
            ? '<div class="col-span-full text-center py-12 text-base-content/50">No hay notas. ¡Crea tu primera nota!</div>'
            : notes.map(note => `
              <div class="card bg-base-200 shadow-xl" data-note-id="${note.id}">
                <div class="card-body">
                  <h3 class="card-title">${note.title}</h3>
                  <p class="text-sm opacity-70">${note.content}</p>
                  <div class="card-actions justify-end mt-4">
                    <button class="btn btn-sm btn-ghost edit-note" data-note-id="${note.id}">Editar</button>
                    <button class="btn btn-sm btn-error delete-note" data-note-id="${note.id}">Eliminar</button>
                  </div>
                  <div class="text-xs opacity-50 mt-2">
                    ${new Date(note.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            `).join('')
          }
        </div>

        <!-- Modal for creating/editing notes -->
        <dialog id="note-modal" class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg mb-4">Nueva Nota</h3>
            <form id="note-form" class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Título</span>
                </label>
                <input type="text" id="note-title" placeholder="Título de la nota" class="input input-bordered" required />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Contenido</span>
                </label>
                <textarea id="note-content" placeholder="Escribe tu nota aquí..." class="textarea textarea-bordered h-32" required></textarea>
              </div>
              <div class="modal-action">
                <button type="button" class="btn" onclick="document.getElementById('note-modal').close()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    `;

    // Notes logic
    let currentNoteId = null;

    function saveNotes(notes) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
      return JSON.parse(localStorage.getItem('notes') || '[]');
    }

    function refreshNotesGrid() {
      const notes = loadNotes();
      const grid = container.querySelector('#notes-grid');

      if (notes.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-12 text-base-content/50">No hay notas. ¡Crea tu primera nota!</div>';
      } else {
        grid.innerHTML = notes.map(note => `
          <div class="card bg-base-200 shadow-xl" data-note-id="${note.id}">
            <div class="card-body">
              <h3 class="card-title">${note.title}</h3>
              <p class="text-sm opacity-70">${note.content}</p>
              <div class="card-actions justify-end mt-4">
                <button class="btn btn-sm btn-ghost edit-note" data-note-id="${note.id}">Editar</button>
                <button class="btn btn-sm btn-error delete-note" data-note-id="${note.id}">Eliminar</button>
              </div>
              <div class="text-xs opacity-50 mt-2">
                ${new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        `).join('');

        attachNoteEventListeners();
      }
    }

    function attachNoteEventListeners() {
      // Edit buttons
      container.querySelectorAll('.edit-note').forEach(btn => {
        btn.addEventListener('click', () => {
          const noteId = btn.getAttribute('data-note-id');
          const notes = loadNotes();
          const note = notes.find(n => n.id === noteId);

          if (note) {
            currentNoteId = noteId;
            container.querySelector('#note-title').value = note.title;
            container.querySelector('#note-content').value = note.content;
            container.querySelector('#note-modal h3').textContent = 'Editar Nota';
            container.querySelector('#note-modal').showModal();
          }
        });
      });

      // Delete buttons
      container.querySelectorAll('.delete-note').forEach(btn => {
        btn.addEventListener('click', () => {
          const noteId = btn.getAttribute('data-note-id');
          const notes = loadNotes();
          const filteredNotes = notes.filter(n => n.id !== noteId);
          saveNotes(filteredNotes);
          refreshNotesGrid();
        });
      });
    }

    // Add note button
    container.querySelector('#add-note-btn').addEventListener('click', () => {
      currentNoteId = null;
      container.querySelector('#note-form').reset();
      container.querySelector('#note-modal h3').textContent = 'Nueva Nota';
      container.querySelector('#note-modal').showModal();
    });

    // Form submit
    container.querySelector('#note-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const title = container.querySelector('#note-title').value;
      const content = container.querySelector('#note-content').value;
      const notes = loadNotes();

      if (currentNoteId) {
        // Edit existing note
        const noteIndex = notes.findIndex(n => n.id === currentNoteId);
        if (noteIndex !== -1) {
          notes[noteIndex] = {
            ...notes[noteIndex],
            title,
            content,
            updatedAt: new Date().toISOString()
          };
        }
      } else {
        // Create new note
        const newNote = {
          id: Date.now().toString(),
          title,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        notes.push(newNote);
      }

      saveNotes(notes);
      container.querySelector('#note-modal').close();
      refreshNotesGrid();
    });

    // Attach initial event listeners
    attachNoteEventListeners();
  },

  destroy: function(instance) {
    console.log('Notes module destroyed');
  }
};
