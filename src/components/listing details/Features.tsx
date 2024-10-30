import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import LoadingLine from "../ui/LoadingLine";
import axios from "axios";
import ChoiceButton from "../listing details/ChoiceButton";

const Features = () => {
    const { setProgress, steps } = useContext(ListingDetailsContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [features, setFeatures] = useState<any>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const url = import.meta.env.VITE_SERVER_URL_LISTING;

    useEffect(() => {
        setProgress((100 / steps) * 4);
        axios
            .get(`${url}/admin/listing/features`)
            .then((res) => {
                setFeatures(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleFeatureSelect = (featureId: string) => {
        setSelectedFeatures((prevSelected) =>
            prevSelected.includes(featureId)
                ? prevSelected.filter((id) => id !== featureId)
                : [...prevSelected, featureId]
        );
    };

    const handleContinue = () => {
        if (selectedFeatures.length === 0) return;
        localStorage.setItem(
          "Listing_details_features",
          JSON.stringify(selectedFeatures)
        );
        navigate("/boats-list/images");
    };

    if (loading) return <LoadingLine />;


    return (
        <div className="w-full md:w-[500px]">
            <p className="mb-5 text-[25px] font-bold">{t("customize_features")}</p>

            <div className="features flex flex-wrap gap-2 lg:gap-3">
                {features.map((feature: any) => (
                    <ChoiceButton
                        key={feature.id}
                        choice={feature.id}
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