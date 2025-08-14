// Armazenamento local para receitas e cardápios
class LocalStorage {
    static getRecipes() {
        const recipes = localStorage.getItem('recipes');
        if (recipes) {
            return JSON.parse(recipes);
        } else {
            // Dados de teste pré-inseridos
            const testRecipes = [
                {
                    id: 'recipe1',
                    titulo: 'Hambúrguer Artesanal',
                    descricao: 'Delicioso hambúrguer com carne bovina, queijo e vegetais frescos.',
                    ingredientes: [
                        { id: 'ing1', descricao: 'Pão de hambúrguer', quantidade: 1, unidade: 'Uni' },
                        { id: 'ing2', descricao: 'Carne bovina (150g)', quantidade: 1, unidade: 'Uni' },
                        { id: 'ing3', descricao: 'Queijo cheddar', quantidade: 1, unidade: 'Uni' },
                        { id: 'ing4', descricao: 'Alface', quantidade: 2, unidade: 'Uni' },
                        { id: 'ing5', descricao: 'Tomate', quantidade: 1, unidade: 'Uni' }
                    ],
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'recipe2',
                    titulo: 'Pizza Margherita',
                    descricao: 'Pizza clássica italiana com molho de tomate, mussarela e manjericão.',
                    ingredientes: [
                        { id: 'ing6', descricao: 'Massa de pizza', quantidade: 1, unidade: 'Uni' },
                        { id: 'ing7', descricao: 'Molho de tomate', quantidade: 200, unidade: 'Uni' },
                        { id: 'ing8', descricao: 'Mussarela', quantidade: 150, unidade: 'Uni' },
                        { id: 'ing9', descricao: 'Manjericão fresco', quantidade: 5, unidade: 'Uni' },
                        { id: 'ing10', descricao: 'Azeite de oliva', quantidade: 2, unidade: 'Uni' }
                    ],
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'recipe3',
                    titulo: 'Salada Caesar',
                    descricao: 'Salada fresca com alface romana, croutons e molho caesar.',
                    ingredientes: [
                        { id: 'ing11', descricao: 'Alface romana', quantidade: 1, unidade: 'Uni' },
                        { id: 'ing12', descricao: 'Croutons', quantidade: 50, unidade: 'Uni' },
                        { id: 'ing13', descricao: 'Queijo parmesão', quantidade: 30, unidade: 'Uni' },
                        { id: 'ing14', descricao: 'Molho caesar', quantidade: 3, unidade: 'Uni' },
                        { id: 'ing15', descricao: 'Peito de frango grelhado', quantidade: 150, unidade: 'Uni' }
                    ],
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveRecipes(testRecipes);
            return testRecipes;
        }
    }

    static saveRecipes(recipes) {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    static getMenus() {
        const menus = localStorage.getItem('menus');
        if (menus) {
            return JSON.parse(menus);
        } else {
            // Dados de teste pré-inseridos para cardápios
            const testMenus = [
                {
                    id: 'menu1',
                    nome: 'Combo Família',
                    descricao: 'Perfeito para compartilhar em família com opções variadas.',
                    recipeIds: ['recipe1', 'recipe2'],
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'menu2',
                    nome: 'Menu Light',
                    descricao: 'Opções saudáveis e nutritivas para uma refeição equilibrada.',
                    recipeIds: ['recipe3'],
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveMenus(testMenus);
            return testMenus;
        }
    }

    static saveMenus(menus) {
        localStorage.setItem('menus', JSON.stringify(menus));
    }

    static generateId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }
}

// Classe para gerenciar receitas
class RecipeManager {
    constructor() {
        this.recipes = LocalStorage.getRecipes();
        this.currentRecipe = null;
        this.editingRecipe = null;
    }

    // Criar nova receita
    createRecipe(recipeData) {
        const recipe = {
            id: LocalStorage.generateId(),
            titulo: recipeData.titulo,
            descricao: recipeData.descricao,
            ingredientes: recipeData.ingredientes,
            createdAt: new Date().toISOString()
        };
        
        this.recipes.push(recipe);
        LocalStorage.saveRecipes(this.recipes);
        return recipe;
    }

    // Obter todas as receitas
    getAllRecipes() {
        return this.recipes;
    }

    // Obter receita por ID
    getRecipeById(id) {
        return this.recipes.find(recipe => recipe.id === id);
    }

    // Atualizar receita
    updateRecipe(id, recipeData) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            this.recipes[index] = {
                ...this.recipes[index],
                titulo: recipeData.titulo,
                descricao: recipeData.descricao,
                ingredientes: recipeData.ingredientes,
                updatedAt: new Date().toISOString()
            };
            LocalStorage.saveRecipes(this.recipes);
            return this.recipes[index];
        }
        return null;
    }

    // Excluir receita
    deleteRecipe(id) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            this.recipes.splice(index, 1);
            LocalStorage.saveRecipes(this.recipes);
            return true;
        }
        return false;
    }
}

// Classe para gerenciar cardápios
class MenuManager {
    constructor() {
        this.menus = LocalStorage.getMenus();
        this.recipeManager = new RecipeManager();
    }

    // Criar novo cardápio
    createMenu(menuData) {
        const menu = {
            id: LocalStorage.generateId(),
            nome: menuData.nome,
            descricao: menuData.descricao,
            recipeIds: menuData.receitas,
            createdAt: new Date().toISOString()
        };
        
        this.menus.push(menu);
        LocalStorage.saveMenus(this.menus);
        return menu;
    }

    // Obter todos os cardápios
    getAllMenus() {
        return this.menus;
    }

    // Obter cardápio por ID
    getMenuById(id) {
        return this.menus.find(menu => menu.id === id);
    }

    // Excluir cardápio
    deleteMenu(id) {
        const index = this.menus.findIndex(menu => menu.id === id);
        if (index !== -1) {
            this.menus.splice(index, 1);
            LocalStorage.saveMenus(this.menus);
            return true;
        }
        return false;
    }

    // Obter receitas de um cardápio
    getMenuRecipes(menuId) {
        const menu = this.getMenuById(menuId);
        if (!menu) return [];
        
        if (!menu.recipeIds || !Array.isArray(menu.recipeIds)) {
            return [];
        }
        
        return menu.recipeIds.map(recipeId => 
            this.recipeManager.getRecipeById(recipeId)
        ).filter(recipe => recipe !== undefined);
    }
}

// Gerenciador de modais
class ModalManager {
    static openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    static closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    static setupModalEvents() {
        // Fechar modal ao clicar no X ou fora do modal
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('close') || e.target.classList.contains('modal')) {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        });

        // Fechar modal com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openModals = document.querySelectorAll('.modal[style*="block"]');
                openModals.forEach(modal => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }
        });
    }
}

// Inicialização da página de receitas
function initRecipesPage() {
    const recipeManager = new RecipeManager();
    let currentIngredientId = 1;
    let editingRecipeId = null;

    // Elementos do DOM
    const addRecipeBtn = document.getElementById('addRecipeBtn');
    const recipeModal = document.getElementById('recipeModal');
    const viewRecipeModal = document.getElementById('viewRecipeModal');
    const recipeForm = document.getElementById('recipeForm');
    const addIngredientBtn = document.getElementById('addIngredientBtn');
    const ingredientsList = document.getElementById('ingredientsList');
    const cancelBtn = document.getElementById('cancelBtn');
    const editRecipeBtn = document.getElementById('editRecipeBtn');
    const deleteRecipeBtn = document.getElementById('deleteRecipeBtn');

    // Configurar eventos dos modais
    ModalManager.setupModalEvents();

    // Carregar receitas na inicialização
    loadRecipes();

    // Event listeners
    addRecipeBtn.addEventListener('click', () => {
        openRecipeModal();
    });

    addIngredientBtn.addEventListener('click', () => {
        addIngredientField();
    });

    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveRecipe();
    });

    cancelBtn.addEventListener('click', () => {
        ModalManager.closeModal('recipeModal');
    });

    editRecipeBtn.addEventListener('click', () => {
        const recipeId = editRecipeBtn.dataset.recipeId;
        editRecipe(recipeId);
    });

    deleteRecipeBtn.addEventListener('click', () => {
        const recipeId = deleteRecipeBtn.dataset.recipeId;
        if (confirm('Tem certeza que deseja excluir esta receita?')) {
            recipeManager.deleteRecipe(recipeId);
            ModalManager.closeModal('viewRecipeModal');
            loadRecipes();
        }
    });

    // Funções
    function loadRecipes() {
        const recipesList = document.getElementById('recipesList');
        const recipes = recipeManager.getAllRecipes();

        if (recipes.length === 0) {
            recipesList.innerHTML = `
                <div class="empty-state">
                    <h3>Nenhuma receita cadastrada</h3>
                    <p>Clique em "Nova Receita" para começar</p>
                </div>
            `;
            return;
        }

        recipesList.innerHTML = recipes.map(recipe => `
            <div class="recipe-card" onclick="viewRecipe('${recipe.id}')">
                <h3>${recipe.titulo}</h3>
                <p>${recipe.descricao}</p>
                <div class="recipe-meta">
                    <span>${recipe.ingredientes.length} ingredientes</span>
                    <span>${new Date(recipe.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
            </div>
        `).join('');
    }

    function openRecipeModal(recipe = null) {
        editingRecipeId = recipe ? recipe.id : null;
        const modalTitle = document.getElementById('modalTitle');
        
        if (recipe) {
            modalTitle.textContent = 'Editar Receita';
            fillRecipeForm(recipe);
        } else {
            modalTitle.textContent = 'Nova Receita';
            clearRecipeForm();
        }
        
        ModalManager.openModal('recipeModal');
    }

    function fillRecipeForm(recipe) {
        document.getElementById('recipeTitle').value = recipe.titulo;
        document.getElementById('recipeDescription').value = recipe.descricao;
        
        // Limpar ingredientes existentes
        ingredientsList.innerHTML = '';
        currentIngredientId = 1;
        
        // Adicionar ingredientes da receita
        recipe.ingredientes.forEach(ingrediente => {
            addIngredientField(ingrediente);
        });
    }

    function clearRecipeForm() {
        document.getElementById('recipeTitle').value = '';
        document.getElementById('recipeDescription').value = '';
        ingredientsList.innerHTML = '';
        currentIngredientId = 1;
        addIngredientField(); // Adicionar um campo vazio
    }

    function addIngredientField(ingrediente = null) {
        const ingredientId = currentIngredientId++;
        const ingredientDiv = document.createElement('div');
        ingredientDiv.className = 'ingredient-item';
        ingredientDiv.innerHTML = `
            <div>
                <label>Descrição:</label>
                <input type="text" name="ingrediente-desc-${ingredientId}" 
                       value="${ingrediente ? ingrediente.descricao : ''}" 
                       placeholder="Ex: Farinha de trigo" required>
            </div>
            <div>
                <label>Quantidade:</label>
                <input type="number" name="ingrediente-qty-${ingredientId}" 
                       value="${ingrediente ? ingrediente.quantidade : ''}" 
                       placeholder="1" step="0.1" min="0" required>
            </div>
            <div>
                <label>Unidade:</label>
                <select name="ingrediente-unit-${ingredientId}" required>
                    <option value="ml" ${ingrediente && ingrediente.unidade === 'ml' ? 'selected' : ''}>ml</option>
                    <option value="kg" ${ingrediente && ingrediente.unidade === 'kg' ? 'selected' : ''}>kg</option>
                    <option value="xícara" ${ingrediente && ingrediente.unidade === 'xícara' ? 'selected' : ''}>xícara</option>
                </select>
            </div>
            <div>
                <button type="button" class="remove-ingredient" onclick="removeIngredient(this)">
                    Remover
                </button>
            </div>
        `;
        
        ingredientsList.appendChild(ingredientDiv);
    }

    window.removeIngredient = function(button) {
        button.closest('.ingredient-item').remove();
    };

    function saveRecipe() {
        const titulo = document.getElementById('recipeTitle').value;
        const descricao = document.getElementById('recipeDescription').value;
        
        // Coletar ingredientes
        const ingredientes = [];
        const ingredientItems = document.querySelectorAll('.ingredient-item');
        
        ingredientItems.forEach(item => {
            const inputs = item.querySelectorAll('input, select');
            const descInput = inputs[0];
            const qtyInput = inputs[1];
            const unitSelect = inputs[2];
            
            if (descInput.value.trim()) {
                ingredientes.push({
                    id: LocalStorage.generateId(),
                    descricao: descInput.value.trim(),
                    quantidade: parseFloat(qtyInput.value) || 0,
                    unidade: unitSelect.value
                });
            }
        });

        if (ingredientes.length === 0) {
            alert('Adicione pelo menos um ingrediente!');
            return;
        }

        const recipeData = { titulo, descricao, ingredientes };
        
        if (editingRecipeId) {
            recipeManager.updateRecipe(editingRecipeId, recipeData);
        } else {
            recipeManager.createRecipe(recipeData);
        }
        
        ModalManager.closeModal('recipeModal');
        loadRecipes();
    }

    window.viewRecipe = function(recipeId) {
        const recipe = recipeManager.getRecipeById(recipeId);
        if (!recipe) return;

        document.getElementById('viewRecipeTitle').textContent = recipe.titulo;
        document.getElementById('viewRecipeDescription').textContent = recipe.descricao;
        
        const ingredientsList = document.getElementById('viewRecipeIngredients');
        if (recipe.ingredientes && Array.isArray(recipe.ingredientes)) {
            ingredientsList.innerHTML = recipe.ingredientes.map(ing => 
                `<li>${ing.quantidade} ${ing.unidade} de ${ing.descricao}</li>`
            ).join('');
        } else {
            ingredientsList.innerHTML = '<li>Nenhum ingrediente cadastrado</li>';
        }
        
        editRecipeBtn.dataset.recipeId = recipeId;
        deleteRecipeBtn.dataset.recipeId = recipeId;
        
        ModalManager.openModal('viewRecipeModal');
    };

    function editRecipe(recipeId) {
        const recipe = recipeManager.getRecipeById(recipeId);
        if (recipe) {
            ModalManager.closeModal('viewRecipeModal');
            openRecipeModal(recipe);
        }
    }
}

// Inicialização da página de cardápios
function initMenusPage() {
    const menuManager = new MenuManager();
    const recipeManager = new RecipeManager();
    
    // Atualizar a lista de receitas do recipeManager
    recipeManager.recipes = LocalStorage.getRecipes();
    let selectedRecipes = [];

    // Elementos do DOM
    const addMenuBtn = document.getElementById('addMenuBtn');
    const menuModal = document.getElementById('menuModal');
    const viewMenuModal = document.getElementById('viewMenuModal');
    const recipeDetailModal = document.getElementById('recipeDetailModal');
    const menuForm = document.getElementById('menuForm');
    const cancelMenuBtn = document.getElementById('cancelMenuBtn');
    const deleteMenuBtn = document.getElementById('deleteMenuBtn');

    // Configurar eventos dos modais
    ModalManager.setupModalEvents();

    // Carregar cardápios na inicialização
    loadMenus();

    // Event listeners
    if (addMenuBtn) {
        addMenuBtn.addEventListener('click', () => {
            openMenuModal();
        });
    } else {
        console.error('Elemento addMenuBtn não encontrado');
    }

    if (menuForm) {
        menuForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveMenu();
        });
    }

    if (cancelMenuBtn) {
        cancelMenuBtn.addEventListener('click', () => {
            ModalManager.closeModal('menuModal');
        });
    }

    if (deleteMenuBtn) {
        deleteMenuBtn.addEventListener('click', () => {
            const menuId = deleteMenuBtn.dataset.menuId;
            if (confirm('Tem certeza que deseja excluir este cardápio?')) {
                menuManager.deleteMenu(menuId);
                ModalManager.closeModal('viewMenuModal');
                loadMenus();
            }
        });
    }

    // Funções
    function loadMenus() {
        const menusList = document.getElementById('menusList');
        if (!menusList) {
            console.error('Elemento menusList não encontrado');
            return;
        }
        const menus = menuManager.getAllMenus();

        if (menus.length === 0) {
            menusList.innerHTML = `
                <div class="empty-state">
                    <h3>Nenhum cardápio cadastrado</h3>
                    <p>Clique em "Novo Cardápio" para começar</p>
                </div>
            `;
            return;
        }

        menusList.innerHTML = menus.map(menu => `
            <div class="menu-card" onclick="viewMenu('${menu.id}')">
                <h3>${menu.nome}</h3>
                <p>${menu.descricao}</p>
                <div class="menu-meta">
                    <span>${menu.recipeIds && Array.isArray(menu.recipeIds) ? menu.recipeIds.length : 0} receitas</span>
                    <span>${new Date(menu.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
            </div>
        `).join('');
    }

    function openMenuModal() {
        selectedRecipes = [];
        document.getElementById('menuName').value = '';
        document.getElementById('menuDescription').value = '';
        // Atualizar receitas antes de carregar
        recipeManager.recipes = LocalStorage.getRecipes();
        loadAvailableRecipes();
        updateSelectedRecipes();
        ModalManager.openModal('menuModal');
    }

    function loadAvailableRecipes() {
        const availableRecipes = document.getElementById('availableRecipes');
        const recipes = recipeManager.getAllRecipes();

        if (recipes.length === 0) {
            availableRecipes.innerHTML = `
                <p>Nenhuma receita disponível. <a href="receitas.html">Criar receita</a></p>
            `;
            return;
        }

        availableRecipes.innerHTML = recipes.map(recipe => `
            <div class="recipe-option" onclick="toggleRecipeSelection('${recipe.id}')">
                <input type="checkbox" id="recipe-${recipe.id}">
                <label for="recipe-${recipe.id}">${recipe.titulo}</label>
            </div>
        `).join('');
    }

    window.toggleRecipeSelection = function(recipeId) {
        const checkbox = document.getElementById(`recipe-${recipeId}`);
        const index = selectedRecipes.indexOf(recipeId);
        
        if (index > -1) {
            selectedRecipes.splice(index, 1);
            checkbox.checked = false;
        } else {
            selectedRecipes.push(recipeId);
            checkbox.checked = true;
        }
        
        updateSelectedRecipes();
    };

    function updateSelectedRecipes() {
        const selectedRecipesDiv = document.getElementById('selectedRecipes');
        
        if (selectedRecipes.length === 0) {
            selectedRecipesDiv.innerHTML = '<p>Nenhuma receita selecionada</p>';
            return;
        }

        selectedRecipesDiv.innerHTML = selectedRecipes.map(recipeId => {
            const recipe = recipeManager.getRecipeById(recipeId);
            return `
                <div class="selected-recipe">
                    <span>${recipe.titulo}</span>
                    <button type="button" class="remove-recipe" onclick="toggleRecipeSelection('${recipeId}')">
                        Remover
                    </button>
                </div>
            `;
        }).join('');
    }

    function saveMenu() {
        const nome = document.getElementById('menuName').value;
        const descricao = document.getElementById('menuDescription').value;
        
        if (selectedRecipes.length === 0) {
            alert('Selecione pelo menos uma receita!');
            return;
        }

        const menuData = {
            nome,
            descricao,
            receitas: selectedRecipes
        };
        
        menuManager.createMenu(menuData);
        ModalManager.closeModal('menuModal');
        loadMenus();
    }

    window.viewMenu = function(menuId) {
        const menu = menuManager.getMenuById(menuId);
        if (!menu) return;

        document.getElementById('viewMenuName').textContent = menu.nome;
        document.getElementById('viewMenuDescription').textContent = menu.descricao;
        
        const menuRecipes = menuManager.getMenuRecipes(menuId);
        const menuRecipesDiv = document.getElementById('viewMenuRecipes');
        
        if (menuRecipes.length === 0) {
            menuRecipesDiv.innerHTML = '<p>Nenhuma receita encontrada neste cardápio</p>';
        } else {
            menuRecipesDiv.innerHTML = menuRecipes.map(recipe => `
                <div class="recipe-card" onclick="viewRecipeDetail('${recipe.id}')">
                    <h3>${recipe.titulo}</h3>
                    <p>${recipe.descricao}</p>
                    <div class="recipe-meta">
                        <span>${recipe.ingredientes.length} ingredientes</span>
                    </div>
                </div>
            `).join('');
        }
        
        deleteMenuBtn.dataset.menuId = menuId;
        ModalManager.openModal('viewMenuModal');
    };

    window.viewRecipeDetail = function(recipeId) {
        const recipe = recipeManager.getRecipeById(recipeId);
        if (!recipe) return;

        document.getElementById('recipeDetailTitle').textContent = recipe.titulo;
        document.getElementById('recipeDetailDescription').textContent = recipe.descricao;
        
        const ingredientsList = document.getElementById('recipeDetailIngredients');
        if (recipe.ingredientes && Array.isArray(recipe.ingredientes)) {
            ingredientsList.innerHTML = recipe.ingredientes.map(ing => 
                `<li>${ing.quantidade} ${ing.unidade} de ${ing.descricao}</li>`
            ).join('');
        } else {
            ingredientsList.innerHTML = '<li>Nenhum ingrediente cadastrado</li>';
        }
        
        ModalManager.openModal('recipeDetailModal');
    };
}

// Inicialização geral
document.addEventListener('DOMContentLoaded', function() {
    // Configurar eventos dos modais em todas as páginas
    ModalManager.setupModalEvents();
});