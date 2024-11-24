import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import LoadingLine from "../ui/LoadingLine";
import axios from "axios";
import ChoiceButton from "../listing details/ChoiceButton";
import PageName from "./PageName";
import {useTranslation} from "react-i18next";





const Features = () => {
    const { setProgress, steps, selectedFeatures, setSelectedFeatures, name, desc, lat, long } = useContext(ListingDetailsContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [features, setFeatures] = useState<any>([]);
    const { i18n } = useTranslation();
    const url = import.meta.env.VITE_SERVER_URL_LISTING;

    useEffect(() => {
        setProgress((100 / steps) * 4);
        const check = !name || !desc || !lat || !long
        if (check) return navigate("/boats-list/title");
        axios
            .get(`${url}/admin/listing/features`)
            .then((res) => {
                // console.log(res.data);
                setFeatures(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });

        // setFeatures(FeaturesDummy);
        setLoading(false);
    }, []);

    const handleFeatureSelect = (featureId: string) => {
        setSelectedFeatures((prevSelected: any) =>
            prevSelected.includes(featureId)
                ? prevSelected.filter((id: any) => id !== featureId)
                : [...prevSelected, featureId]
        );
    };

    const handleContinue = () => {
        if (selectedFeatures.length === 0) return;
        navigate("/boats-list/images");
    };

    if (loading) return <LoadingLine />;


    return (
        <div className="w-full md:w-[500px]">
            <PageName text="customize_features" />
            <div className="features flex flex-wrap gap-2 lg:gap-3">
                {features.map((feature: any, index: number) => (
                    <ChoiceButton
                        key={index}
                        choice={(index+1).toString()}
                        // text={feature.name}
                        text={i18n.language === "en" ? feature.name : feature.arabic_name}
                        value={selectedFeatures}
                        setValue={handleFeatureSelect}
                        checkValue={feature.id}
                    />
                ))}
            </div>

            <ContinueButton onClick={handleContinue} />
        </div>
    );
};

export default Features;

// const FeaturesDummy = [
//     {
//         id: 4,
//         name: "Feature 1",
//     },
//     {
//         id: 5,
//         name: "Feature 2",
//     },
//     {
//         id: 8,
//         name: "Feature 3",
//     },
//     {
//         id: 1,
//         name: "Feature 4",
//     },
//     {
//         id: 10,
//         name: "Feature 5",
//     },
//     {
//         id: 11,
//         name: "Feature 6",
//     },
//     {
//         id: 12,
//         name: "Feature 7",
//     },
//     {
//         id: 17,
//         name: "Feature 8",
//     },
//     {
//         id: 9,
//         name: "Feature 9",
//     },
//     {
//         id: 10,
//         name: "Feature 10",
//     },
// ]