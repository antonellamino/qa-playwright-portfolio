// e2e/pages/RegisterPage.ts
//se importa lo que necesitamos de playwright
//page representa la pestaña de navegacion activa, locator representa un elemento de la pagina y 
//expect es para hacer aserciones
import { Page, Locator, expect } from '@playwright/test';


//define la clase RegisterPage que representa la pagina de registro
export class RegisterPage {

    //se definen las propiedades de la clase, que son los elementos de la pagina que vamos a interactuar
    //readonly indica que estas propiedades no se pueden modificar despues de ser inicializadas, buena practica para evitar errores
    //los nombres como nombreInput son los nombres de las variables que representan los elementos de la pagina, y se asignan a los locators correspondientes usando page.getByRole o page.getByText
    //locator es el tipo de dato
    readonly page: Page;
    readonly nombreInput: Locator;
    readonly apellidoInput: Locator;
    readonly emailInput: Locator;
    readonly terminosCheckbox: Locator;
    readonly cvFileInput: Locator;
    readonly passwordInput: Locator;
    readonly registrarseButton: Locator;
    readonly toastExito: Locator;

    //el contructor asigna los locators a las propiedades de la clase, usando el objeto page que se pasa como parametro
    //page es el objeto que representa la pestaña de navegacion activa, y se usa para buscar los elementos de la pagina
    constructor(page: Page) {
        this.page = page; //Guarda esa pestaña dentro de la clase.
        this.nombreInput = page.getByRole('textbox', { name: 'Nombre' });
        this.apellidoInput = page.getByRole('textbox', { name: 'Apellido' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.terminosCheckbox = page.getByRole('checkbox', { name: 'Acepto los Términos y' });
        this.cvFileInput = page.getByRole('button', { name: 'Cargar CV (.PDF o .DOCX, máx' });
        this.passwordInput = page.getByRole('textbox', { name: 'Contraseña' });
        this.registrarseButton = page.getByRole('button', { name: 'Registrarse' });
        this.toastExito = page.getByText(/registro exitoso/i);
    }

    async navegar() {
        await this.page.goto('https://talento-lab-test-web.netlify.app/register');
    }

    async completarFormulario(nombre: string = '', apellido: string = '', email: string = '', pass: string = '', archivoPdf?: string, aceptarTerminos: boolean = true) {
        if (nombre) await this.nombreInput.fill(nombre);
        if (apellido) await this.apellidoInput.fill(apellido);
        if (email) await this.emailInput.fill(email);
        if (pass) await this.passwordInput.fill(pass);

        if (aceptarTerminos) {
            await this.terminosCheckbox.check();
        }

        if (archivoPdf) {
            await this.cvFileInput.setInputFiles(archivoPdf);
        }

        await this.registrarseButton.click();
    }

    async verificarRegistroExitoso() {
        await expect(this.toastExito).toBeVisible();
    }

    async hacerClicEnRegistrarse() {
        await this.registrarseButton.click();
    }
}