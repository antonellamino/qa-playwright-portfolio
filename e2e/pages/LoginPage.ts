import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly toastError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByLabel('email');
        this.passwordInput = page.getByLabel(/password|contraseña/i);
        this.loginButton = page.getByRole('button', { name: 'Ingresar'});
        this.toastError = page.locator('.toast, .alert-danger, [role="alert"]');
    }

    async navegarRegistro(){
        await this.page.goto('https://talento-lab-test-web.netlify.app/register');
    }

    async navegarLogin(){
        await this.page.goto('https://talento-lab-test-web.netlify.app/login.html');
    }

    async iniciarSesion(email: string= '', pass: string= ''){
        if(email) await this.emailInput.fill(email);
        if(pass) await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

}