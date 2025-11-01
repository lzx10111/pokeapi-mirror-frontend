import HeaderContent from '../contents/header/HeaderContent';
import FooterContent from '../contents/footer/FooterContent';
import EditionForm from "../components/EditionForm";
import data from "../components/editionFormData";
import { useRef } from "react";

export default function EditionPage() {
    const editionFormData = useRef(data);
    const editionFormElements = editionFormData.current.map((x, index) => <EditionForm key={index} obj={x} />);

    return (
        <>
            <HeaderContent />
            <main>
                <div className="modal" id="editionModal" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" id="modalContentEdition"></div>
                    </div>
                </div>

                <div className="container containerEdition mt-4 overflow-hidden border border-secundary rounded">
                    {editionFormElements[0]}
                </div>
                <div className="container containerEdition mt-5 overflow-hidden border border-secundary rounded">
                    {editionFormElements[1]}
                </div>
                <div className="container containerEdition">
                    <div className="row">
                        <div className="container col me-2 mt-5 overflow-hidden border border-secundary rounded">
                            {editionFormElements[2]}
                        </div>
                        <div className="container col ms-2 mt-5 overflow-hidden border border-secundary rounded">
                            {editionFormElements[3]}
                        </div>
                    </div>
                </div>
            </main>
            <FooterContent />
        </>
    )
}