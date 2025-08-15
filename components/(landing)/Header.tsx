import HeaderClient from "./Header/HeaderClient";

export default function Header() {
    return (
        <header className="fixed top-0 w-full bg-lightBg z-50 dark:bg-darkBg ">
            <HeaderClient />
        </header>
    );
}
