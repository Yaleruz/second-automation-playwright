// @ts-check
const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('ejercicio', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());

  //

  const email = ('#userEmail');
  const password = ('#userPassword');
  const btnLogin = ('#login');
  const products =   await page.locator(".card-body"); 
  const productName = 'ZARA COAT 3';
  await page.locator(email).fill('Yimi@gmail.com');
  await page.locator(password).fill('12345678**Aa');
  

  await page.locator(btnLogin).click();
  //esto espera a que la red se encuentre inactiva
  //cuando se entra, la red estará ocupada haciendo todas las llamadas y pasara a estado de reposo cuando todas las llamadas se hayan realizado correctamente
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  //.count() nos dice cuantos productos existen o devuelve el numero entero de la cantidad de elementos
    const count = await products.count();
    //se utiliza for para recorrer los productos
    for(let i =0;i< count;++i){
      //.nth(i) nos indica la posición del producto en la lista

      if (await products.nth(i).locator("b").textContent() === productName){

        
        //se añade el producto al carrito
        await products.nth(i).locator("text= Add To Cart").click();
        //se utiliza break para romper con la iteración del bucle
        break;


        
      }
      

    }

    //localizador para el carrito de compras
    await page.locator('[routerlink*="cart"]').click();
    //se espera a que los elementos cargue
    await page.locator("div li").first().waitFor();
    //con esto validamos si el producto se encuentra en el carrito de compras
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    //se espera que la respuesta sea correcta
    expect(bool).toBeTruthy();
    //clic en botón 
    await page.locator('text=Checkout').click();

    const cvvCode = await page.locator("(//input[@type='text'])[2]");
    const nameCard = await page.locator("(//input[@type='text'])[3]");

    await cvvCode.fill('125');
    await nameCard.fill('mastercad');

        
    //se identifica un localidaor
    //.pressSequentially() va ingresar campo por campo, a diferencia de fill que pega de una vez el texto. 
    //.pressSequentially() nos permite ver que despliegue la opción colombia
    await page.locator("[placeholder*='Country']").pressSequentially('co')

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    //.count() devuelve el numero entero de los elementos
    const optionsCount = await dropdown.locator("button").count();
    //se recorren las opciones de la lista desplegable
    for (let i = 0; i < optionsCount; i++) {

        //se obtiene el texto de los elementos de la lista desplegable
         const text = await dropdown.locator("button").nth(i).textContent();
         
        // se compara que el texto obtenido sea igual a colombia 
       if (text === " Colombia") {
        // en caso que si coincida debe dar clic en el botón. esto para poder seleccionar la opción de la lista desplegable
         await dropdown.locator("button").nth(i).click();
         //se rompe el bucle
         break;

        
       }
      
    }




    //se espera   

    await page.pause();

    //


});

