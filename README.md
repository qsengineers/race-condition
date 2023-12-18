# Qikserve's Race Condition challenge

This challenge consists of solving a recent issue we had in a specific project, where we need to avoid race condition in some scenarios.

This application will simulate a basket of an online ordering website. This basket have 2 items, and the guest can increase / decrease its quantity.

It also has a "Checkout" button. That button will start the payment proccess.

When clicking on Plus and Minus buttons, the application will pre-calculate the basket's total on client side, to show a real time value to customer, and then will make a request to API to validate its total.

The total usually doesn't change, thats why we trust on client side calculation too.

While the total is being validate in API, guests can still keep using application, increasing and decreasing quantities.

While the total is being validate in API, the "Checkout" button should be disabled because we want a confirmation before allowing payments.

# The problem
If you click fast on click & minus buttons, it won't control those clicks. We will validate the basket in API after 3 seconds... It causes inconsistences in the system as the total could change while customer clicks on "Checkout" button.
To reproduce:
- Increase quantity of 1 item
- While the request is done, click to increase quantity again
- You will notice another request will be done after 3 seconds and you will be able to click on "Checkout" button while its not done.
- This could cause inconsistences as the total could change in the middle of a payment


# The solution
You should build a race condition solution to solve this problem.
## Solution's rules
- We don't want to disable Plus & Minus button while the request is being done
- If i click twice in a Plus or minus button, i want the application to make only 1 request
- If i click on minus or plus button while the request is being done, another request should be done as soon as the current one finishes
  - Checkout button should be disabled while those 2 requests are not finished.




## Project stack
- Vite
- React 16
- Redux

## Run instructions
- nvm use
- npm install
- npm run dev


