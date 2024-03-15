import { CatalogFile } from "@/store/manifest";

type XmlName = Omit<CatalogFile.ItemInFile, 'password' | 'askalways' | 'onetvalue'> & {
    password?: boolean | '1';     // undefined : '1'
    askalways?: boolean | '1';    // undefined : '1' 
    onetvalue?: boolean | '1';    // undefined : '1'
}

const fileNames: XmlName[] = [
    {
        dispname: "FSBA UN",
        dbname: "{c0f864c8-7bbb-422e-98a3-e033d7360c97}",
    },
    {
        dispname: "FSBA PW",
        dbname: "{473b1ff7-660c-4d52-b7af-e531d4658795}",
        password: "1",
    },
    {
        dispname: "XNET/WildCard User ID",
        dbname: "{5059d79b-3dcd-4a72-8f87-474bc9ba3a74}",
    },
    {
        dispname: "XNET/Wildcard Password",
        dbname: "{c5693945-40a6-4375-905f-a69b6f0b6166}",
        password: "1",
    },
    {
        dispname: "Loan Officer Workbench UN",
        dbname: "{97980c3a-fbfa-4ba3-9765-a4d5224b4989}",
    },
    {
        dispname: "Loan Officer Workbench PW",
        dbname: "{6a6694e5-039e-4312-8ea2-4ed8858a6f5e}",
        password: "1",
    },
    {
        dispname: "Evolve UN",
        dbname: "{ae2b3db3-d012-4e20-8e7a-d9085b982904}",
    },
    // {
    //     dispname: "Evolve PW",
    //     dbname: "{8c9aa0d0-6b4e-4047-a184-f48e23d3549e}",
    //     password: "1",
    // },
    // {
    //     dispname: "ARCOT PW",
    //     dbname: "{76c93069-e3b1-43d2-b1d7-7edf2589097e}",
    //     password: "1",
    // },
    // {
    //     dispname: "Personix UN",
    //     dbname: "{c27595cd-ece9-4683-9c8d-7f58a692b8b4}",
    // },
    // {
    //     dispname: "Personix PW",
    //     dbname: "{3b8f0fdb-97ed-4a35-9e13-012ecd39b03a}",
    //     password: "1",
    // },
    // {
    //     dispname: "RM PW",
    //     dbname: "{77303aa9-13c9-4737-bfda-37f7b22199ac}",
    //     password: "1",
    // },
    // {
    //     dispname: "BankTel UN",
    //     dbname: "{cc9b099b-7aaa-49c9-aa0e-1ea83f102170}",
    // },
    // {
    //     dispname: "BankTel PW",
    //     dbname: "{6da9f97a-b88e-499d-b09e-afa49c8919d0}",
    //     password: "1",
    // },
    // {
    //     dispname: "UPEnterprise PW",
    //     dbname: "{1c3c6451-c076-4ee5-97b5-520ad98ae4d0}",
    //     password: "1",
    // },
    // {
    //     dispname: "UChoose UN",
    //     dbname: "{0ba7f70f-82b1-4230-a107-2f8c5b4f1152}",
    // },
    // {
    //     dispname: "UChoose PW",
    //     dbname: "{3126f8ee-59c0-4882-aa38-143b3332f5d7}",
    //     password: "1",
    // },
    // {
    //     dispname: "For Clients UN",
    //     dbname: "{479f29b2-940c-498a-8890-a9bcfb092b9a}",
    // },
    // {
    //     dispname: "For Clients PW",
    //     dbname: "{8842a78c-d80c-4209-b3c7-b0d14f5d0ce5}",
    //     password: "1",
    // },
    // {
    //     dispname: "Evolve Test UN",
    //     dbname: "{e98b5791-d9aa-45d7-b1d9-e900c3dd8bb9}",
    // },
    // {
    //     dispname: "Evolve Test PW",
    //     dbname: "{6be91868-b6e4-4868-b842-227c101c0105}",
    //     password: "1",
    // },
    // {
    //     dispname: "FannieMae UN",
    //     dbname: "{422fb289-14de-48b0-94f8-538ef8a4215a}",
    // },
    // {
    //     dispname: "FannieMae PW",
    //     dbname: "{060abb34-813a-4515-a0a8-845ab59211e6}",
    //     password: "1",
    // },
    // {
    //     dispname: "Hamp Reporting UN",
    //     dbname: "{a499e4ab-8e86-4713-8ae1-c1bb97bd08e9}",
    // },
    // {
    //     dispname: "GFX UN",
    //     dbname: "{d62ae49c-a032-446e-9216-1a26dd74a3dd}",
    // },
    // {
    //     dispname: "GFX PW",
    //     dbname: "{b26fa659-a407-40ab-b661-68317d7a6b6e}",
    //     password: "1",
    // },
    // {
    //     dispname: "eFunds PW",
    //     dbname: "{0b4c5c84-943f-4e11-968e-5ec9b852b9f8}",
    //     password: "1",
    // },
    // {
    //     dispname: "Name 0",
    //     dbname: "{a7b7ab61-b0fc-4e45-bc48-8ec77796e1c2}",
    // },
    // {
    //     dispname: "EPPS UN",
    //     dbname: "{9db15be9-617c-44c3-9532-f948ea44992f}",
    // },
    // {
    //     dispname: "EPPS PW",
    //     dbname: "{8c56ee7d-f279-4867-a8b9-b3a498427259}",
    //     password: "1",
    // },
    // {
    //     dispname: "MemberConnect UN",
    //     dbname: "{baf53da5-09de-45f0-a158-d48c8dcd81e5}",
    // },
    // {
    //     dispname: "MemberConnect PW",
    //     dbname: "{f2541bf4-231a-4c21-9ee0-cf427e001a8c}",
    //     password: "1",
    // },
    // {
    //     dispname: "VISA Online PW",
    //     dbname: "{501a2a32-e73a-47d7-9846-a01ed6086fb7}",
    //     password: "1",
    // },
    // {
    //     dispname: "UCM PW",
    //     dbname: "{d47b0fc4-2eef-4070-ae75-8e6a6e39eb83}",
    //     password: "1",
    // },
    // {
    //     dispname: "UCM UN",
    //     dbname: "{2e88cf7b-048f-4571-8507-aeda3b9af8a7}",
    // },
    // {
    //     dispname: "PartnerCare UN",
    //     dbname: "{2b3c2865-df15-44d5-83da-51e8b94e9c98}",
    // },
    // {
    //     dispname: "PartnerCare PW",
    //     dbname: "{8f7fab49-99dd-4580-8f8e-bf210fba27f5}",
    //     password: "1",
    // },
    // {
    //     dispname: "ePort UN",
    //     dbname: "{67a87458-a49f-4381-9274-e16f551ffe28}",
    // },
    // {
    //     dispname: "ePort PW",
    //     dbname: "{29ad7093-1bb9-4039-b24f-60a89df800fa}",
    //     password: "1",
    // },
    // {
    //     dispname: "WatchDog UN",
    //     dbname: "{7a400f94-455a-4538-963c-9715b6456f05}",
    // },
    // {
    //     dispname: "WatchDog PW",
    //     dbname: "{6bd81d56-fe84-4757-88ad-36fded111c22}",
    //     password: "1",
    // },
    // {
    //     dispname: "StarStation PW",
    //     dbname: "{bc8e46be-ece4-4c2e-a8e4-466b92e7bc1d}",
    //     password: "1",
    // },
    // {
    //     dispname: "SCO UN",
    //     dbname: "{58076ded-1e68-4a50-9dab-c7b05e2668f8}",
    // },
    // {
    //     dispname: "SCO PW",
    //     dbname: "{bc254023-1f36-4d15-99c5-257602f145ef}",
    //     password: "1",
    // },
    // {
    //     dispname: "Verint Connect PW",
    //     dbname: "{d7b73e16-294d-43c0-880a-f3b98178831e}",
    //     password: "1",
    // },
    // {
    //     dispname: "Verint Connect UN",
    //     dbname: "{3423132c-7f6f-455d-9e18-9b2e3891a014}",
    // },
    // {
    //     dispname: "ProfitStars ACH Manager UN",
    //     dbname: "{ad639f88-d147-4480-ab83-cf7f82580354}",
    // },
    // {
    //     dispname: "ProfitStars ACH Manager PW",
    //     dbname: "{afcabb8d-ef1b-442d-8f47-cf394c5f4823}",
    //     password: "1",
    // },
    // {
    //     dispname: "GoldLeaf Direct Authorization UN",
    //     dbname: "{c0e67b3f-dd43-4b02-9d99-5b4ed7969f30}",
    // },
    // {
    //     dispname: "GoldLeaf Direct Authorization PW",
    //     dbname: "{b6f56ced-c15b-4429-bd0c-cc076f17217e}",
    //     password: "1",
    // },
    // {
    //     dispname: "Title Tracking - UN",
    //     dbname: "{b4118bf0-148f-4f1a-9851-949cac8ee8bd}",
    // },
    // {
    //     dispname: "Title Tracking PW",
    //     dbname: "{290ed769-4c9d-4cd4-a5c4-d8be994080d7}",
    //     password: "1",
    // },
    // {
    //     dispname: "LexisNexis UN",
    //     dbname: "{7783c40e-7e4c-4562-be9e-51ac44304b52}",
    // },
    // {
    //     dispname: "LexisNexis PW",
    //     dbname: "{ea39ce5a-0c64-42e9-abd8-d01a0637ddd7}",
    //     password: "1",
    // },
    // {
    //     dispname: "Viewpointe PW",
    //     dbname: "{5d5ee2a2-c242-4799-85ad-3f24310e2fab}",
    //     password: "1",
    // },
    // {
    //     dispname: "Viewpointe UN",
    //     dbname: "{5d38be15-9741-40c8-820d-8bc2330049dd}",
    // },
    // {
    //     dispname: "MemberConnect UN + Client ID",
    //     dbname: "{7c296018-8ace-4156-b966-bd2e58e5473c}",
    // },
    // {
    //     dispname: "Experian UN",
    //     dbname: "{2d097016-277a-472f-baf2-92e57b003a9d}",
    // },
    // {
    //     dispname: "Experian PW",
    //     dbname: "{dbf93220-dd21-4a31-967d-8c0ba7b06916}",
    //     password: "1",
    // },
    // {
    //     dispname: "Timeforce UN",
    //     dbname: "{0d25c767-a0e6-4bf5-a7c2-57c4a1273a65}",
    // },
    // {
    //     dispname: "Timeforce PW",
    //     dbname: "{60126deb-cde0-4679-ace3-142f6ccb5ab9}",
    //     password: "1",
    // },
    // {
    //     dispname: "SailPoint Compass Community UN",
    //     dbname: "{eb47131b-fd22-4aa5-8fa0-09b387ee667e}",
    // },
    // {
    //     dispname: "SailPoint Compass Community PW",
    //     dbname: "{2983dab3-e0ea-4a32-a5f3-7dd7f5606983}",
    //     password: "1",
    // },
    // {
    //     dispname: "VA Portal UN",
    //     dbname: "{4e33026a-3c85-4e76-a85e-c62f41cf11e7}",
    // },
    // {
    //     dispname: "VA Portal PW",
    //     dbname: "{b076adbc-906e-4f86-a89b-3d9e8920dd2b}",
    //     password: "1",
    // },
    // {
    //     dispname: "Encompass UN",
    //     dbname: "{943c7171-3ba4-4bd8-9375-ce84a9343225}",
    // },
    // {
    //     dispname: "Encompass PW",
    //     dbname: "{d5da228c-b6a4-4bf6-8e42-42753b50b09d}",
    //     password: "1",
    // },
    // {
    //     dispname: "Manheim UN",
    //     dbname: "{f05ea4a0-701c-4257-8733-0312b10c1cec}",
    // },
    // {
    //     dispname: "Manheim PW",
    //     dbname: "{5fd756dd-ecf5-478c-80ae-ac0e9b001c19}",
    //     password: "1",
    // },
    // {
    //     dispname: "Avaya CM UN",
    //     dbname: "{a2636faa-beac-4fe0-8d20-489fa643d4da}",
    // },
    // {
    //     dispname: "Avaya CM PW",
    //     dbname: "{27c09848-9ded-44d6-aebb-3b95c42d5a7d}",
    //     password: "1",
    // },
    // {
    //     dispname: "3D Secure UN",
    //     dbname: "{ef6ddf05-d472-452d-891e-c8934b60593e}",
    // },
    // {
    //     dispname: "3D Secure PW",
    //     dbname: "{123e1a4c-3afd-4b97-8e63-64ff2c50c9f5}",
    // },
    // {
    //     dispname: "Gartner UN",
    //     dbname: "{c314ad6f-21f4-43d9-bf25-786dd606e821}",
    // },
    // {
    //     dispname: "Gartner PW",
    //     dbname: "{24954169-5e12-4220-9bfc-7fd18d659636}",
    //     password: "1",
    // },
    // {
    //     dispname: "Bridger Insight UN",
    //     dbname: "{f578f8fb-110d-42f0-8ea7-cf1501f3baf9}",
    // },
    // {
    //     dispname: "Bridger Insight PW",
    //     dbname: "{42ea4a53-9b5f-4e6d-8a62-28d16fdf6e32}",
    //     password: "1",
    // },
    // {
    //     dispname: "CWS UN",
    //     dbname: "{9b729c96-89be-4dd2-9db2-99eec21fb2b1}",
    // },
    // {
    //     dispname: "CUNA UN",
    //     dbname: "{50b92a2b-87c8-490b-ad2d-a58298223866}",
    // },
    // {
    //     dispname: "CUNA PW",
    //     dbname: "{07fdf04f-4ce5-42c1-9fd7-6ad5f5df3bdf}",
    //     password: "1",
    // },
    // {
    //     dispname: "SRS Advantage UN",
    //     dbname: "{aaf5de6f-0ca2-4ee5-b523-bb0b5d81dd7e}",
    // },
    // {
    //     dispname: "SRS Advantage PW",
    //     dbname: "{d6246cf7-6120-44d5-8686-be44e69000ef}",
    //     password: "1",
    // },
    // {
    //     dispname: "Rapid Reporting UN",
    //     dbname: "{225f529f-6eea-40cc-be56-31b7ac92801d}",
    // },
    // {
    //     dispname: "Rapid Reporting PW",
    //     dbname: "{041aa6c9-0011-4288-a3ed-5c9e0a203ef4}",
    //     password: "1",
    // },
    // {
    //     dispname: "Bright Horizons PW",
    //     dbname: "{9219b5f7-e0f6-4174-b1c2-d26c95e698fa}",
    //     password: "1",
    // },
    // {
    //     dispname: "FIS Cient Portal UN",
    //     dbname: "{85ceac18-7a8b-4a3a-80f7-2428efa04e94}",
    // },
    // {
    //     dispname: "FIS Client Portal PW",
    //     dbname: "{1c0ba556-2d72-483a-95ae-cda8d1999959}",
    //     password: "1",
    // },
    // {
    //     dispname: "Workday Learning Center PW",
    //     dbname: "{e6601e90-f79c-475e-ac01-9921a0354174}",
    //     password: "1",
    // },
    // {
    //     dispname: "FedEx UN",
    //     dbname: "{02b191f5-0c7f-4bba-8187-1efdd6fd6436}",
    // },
    // {
    //     dispname: "FedEx PW",
    //     dbname: "{76652dac-4f57-4f92-b15f-7ec975350da2}",
    //     password: "1",
    // },
    // {
    //     dispname: "Verafin UN",
    //     dbname: "{cd75e138-b463-47b3-bd62-9059e75f3e9d}",
    // },
    // {
    //     dispname: "Verafin PW",
    //     dbname: "{459cac5b-c0cb-491c-b901-fb7c9c6d5592}",
    //     password: "1",
    // },
    // {
    //     dispname: "ESS UN",
    //     dbname: "{8b63e338-2e5b-4d5d-b8f3-f7bbfab2f1a5}",
    // },
    // {
    //     dispname: "ESS PW",
    //     dbname: "{588156c7-3cc9-4e1d-b2d5-4326f166978c}",
    //     password: "1",
    // },
    // {
    //     dispname: "SCRA UN",
    //     dbname: "{083642f6-0dbb-4952-a9ad-9e4925f63c80}",
    // },
    // {
    //     dispname: "SCRA PW",
    //     dbname: "{26720f28-3ea3-4d03-9506-96e526bf0443}",
    //     password: "1",
    // },
    // {
    //     dispname: "FiServ CWS PW",
    //     dbname: "{e6d860f3-fc4e-43fb-af1c-aed700131c05}",
    //     password: "1",
    // },
    // {
    //     dispname: "PayNow UN",
    //     dbname: "{df46e1cd-2212-4f3f-b3fb-5c8fb3ac4de8}",
    // },
    // {
    //     dispname: "PayNow PW",
    //     dbname: "{5e37ad13-3356-4e0c-a3c5-d93930cd1cb9}",
    //     password: "1",
    // },
    // {
    //     dispname: "EAD UW",
    //     dbname: "{65baf96d-8ad5-4eec-93d4-1f2e7a6eef4b}",
    // },
    // {
    //     dispname: "EAD PW",
    //     dbname: "{5161ae7c-6c70-4b19-ac81-7220b06782ec}",
    //     password: "1",
    // },
    // {
    //     dispname: "Encompass Instance ID",
    //     dbname: "{d09f8905-3729-42b6-98a4-1078eec84486}",
    // },
    // {
    //     dispname: "Insight/ACH Tracker UN",
    //     dbname: "{630f68ee-bbd8-4301-b059-413db627e02e}",
    // },
    // {
    //     dispname: "Insight/ACH Tracker PW",
    //     dbname: "{0117a9ac-90f9-4401-994e-754d9c02c848}",
    //     password: "1",
    // },
    // {
    //     dispname: "3d Secure Org Name",
    //     dbname: "{31cbcbea-ebae-4ef9-89f8-e5ff9b7b5049}",
    // },
    // {
    //     dispname: "FIS IDology UN",
    //     dbname: "{3fb2fad8-b455-4b8c-baff-092d26ba9c48}",
    // },
    // {
    //     dispname: "FIS IDology PW",
    //     dbname: "{57b20e54-b5cd-4b59-9c90-12bc112c6c45}",
    //     password: "1",
    // },
    // {
    //     dispname: "SailPoint University PW",
    //     dbname: "{7a75b516-a46d-42ec-b861-09f97a2dd466}",
    //     password: "1",
    // },
    // {
    //     dispname: "DataVerify UN",
    //     dbname: "{0e0b3e82-01fd-43ee-992a-7d7a1269c31b}",
    // },
    // {
    //     dispname: "DataVerify PW",
    //     dbname: "{c019f206-e1cd-4581-bb86-c7847e2ced89}",
    //     password: "1",
    // },
];

export const catalogTestNames: CatalogFile.ItemInFile[] = (
    function convert(): CatalogFile.ItemInFile[] {
        return fileNames.map((item) => {
            const newItem: CatalogFile.ItemInFile = {
                dispname: item.dispname,
                dbname: item.dbname,
                ...(item.value && { value: item.value }),
                ...(item.ownernote && { ownernote: item.ownernote }),
                ...(item.askalways && { askalways: !!item.askalways }),
                ...(item.onetvalue && { onetvalue: !!item.onetvalue }),
                ...(item.password && { password: !!item.password }),
            };
            return newItem;
        });
    }
)();
