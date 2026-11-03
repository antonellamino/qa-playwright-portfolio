import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('registro', async ({ page }) => {
  await page.goto('https://talento-lab-test-web.netlify.app/register');

  // 2. Llenar los campos del formulario
  await page.getByRole('textbox', { name: 'Nombre' }).fill('erika');
  await page.getByRole('textbox', { name: 'Apellido' }).fill('antonella');
  await page.getByRole('textbox', { name: 'Email' }).fill('erika.test@gmail.com');
  await page.getByRole('checkbox', { name: 'Acepto los Términos y' }).check();
  
  // 3. Adjuntar el PDF desde la raíz
  await page.getByRole('button', { name: 'Cargar CV (.PDF o .DOCX, máx' }).setInputFiles('fullstack-9-meses.pdf');
  
  // 4. Contraseña y submit
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Anto234bfd');
  await page.getByRole('button', { name: 'Registrarse' }).click();

  // 5. Assertion para verificar que el registro sea exitoso
  await expect(page.getByText('Registro exitoso. Serás redirigido')).toBeVisible();
});
