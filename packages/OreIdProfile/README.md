# ORE ID - React Profile

Popup User Profile Experience

This library should be used in a React application.
This library requires the `oreid-js` npm package.

## Overview

This library works with oreid-js to provide a "buttom user profile experience" and a "modal user profile" for oreid users.

## How to use

### Installation

```
npm install oreid-js oreid-profile
```

or

```
yarn add oreid-js oreid-profile
```

After installation, initalize `oreid-js`. We recommend that you initialize it once during your application's bootstrap.

### User's button profile

```tsx
<OreIdProfileButton
	align="right" // "left" | "right";
	oreId={oreId} // OreId instance
	style={{
		backgroundColor: "#2A3566",
		linkColor: "#3A9FFF",
		textColor: "#fff",
	}}
/>
```

### User's profile

```tsx
<OreIdProfile
	anchor={<button onClick={() => setShowModal(true)}>open profile</button>} // JSX.Element that the modal will be "linked to"
	open={isOpen} // boolean
	onClose={() => setIsOpen(false)} // onClose function
	oreId={oreId} // OreId instance
	align="right" // "left" | "right";
/>
```
