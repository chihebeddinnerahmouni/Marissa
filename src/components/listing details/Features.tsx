import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import LoadingLine from "../ui/LoadingLine";
import axios from "axios";
import ChoiceButton from "../listing details/ChoiceButton";


const FeaturesDummy = [
    {
        id: 4,
        name: "Feature 1",
    },
    {
        id: 5,
        name: "Feature 2",
    },
    {
        id: 8,
        name: "Feature 3",
    },
    {
        id: 1,
        name: "Feature 4",
    },
    {
        id: 10,
        name: "Feature 5",
    },
    {
        id: 11,
        name: "Feature 6",
    },
    {
        id: 12,
        name: "Feature 7",
    },
    {
        id: 17,
        name: "Feature 8",
    },
    {
        id: 9,
        name: "Feature 9",
    },
    {
        id: 10,
        name: "Feature 10",
    },
]


const Features = () => {
    const { setProgress, steps, selectedFeatures, setSelectedFeatures, name, desc, lat, long } = useContext(ListingDetailsContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [features, setFeatures] = useState<any>([]);
    // const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const url = import.meta.env.VITE_SERVER_URL_LISTING;

    useEffect(() => {
        setProgress((100 / steps) * 4);
        const check = !name || !desc || !lat || !long
        if (check) navigate("/boats-list/title");
        // axios
        //     .get(`${url}/admin/listing/features`)
        //     .then((res) => {
        //         setFeatures(res.data);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        setFeatures(FeaturesDummy);
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
        // sessionStorage.setItem(
        //   "Listing_details_features",
        //   JSON.stringify(selectedFeatures)
        // );
        navigate("/boats-list/images");
    };

    if (loading) return <LoadingLine />;


    return (
        <div className="w-full md:w-[500px]">
            <p className="mb-5 text-[25px] font-bold">{t("customize_features")}</p>

            <div className="features flex flex-wrap gap-2 lg:gap-3">
                {features.map((feature: any, index: number) => (
                    <ChoiceButton
                        key={index}
                        choice={(index+1).toString()}
                        text={feature.name}
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