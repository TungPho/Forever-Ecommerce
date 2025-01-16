import { assets } from "../assets/assets";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eum,
            quo impedit provident dolor totam, quasi consequuntur veritatis
            assumenda ratione ullam quidem, dolorem fugiat vel quis dignissimos
            beatae quaerat voluptatum!
          </p>
          <p className="text-start">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            sit corporis explicabo quas, illum cum est, esse repudiandae facere
            ut repellendus? Repudiandae hic asperiores atque, ipsum quasi
            deserunt obcaecati necessitatibus!
          </p>
          <b className="text-gray-800">Our mission</b>
          <p className="text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, illo
            suscipit! Possimus voluptas ex dicta esse accusamus laboriosam neque
            rerum error. Molestiae totam quisquam nam obcaecati neque molestias,
            aliquid commodi.
          </p>
        </div>
      </div>
      <div className="text-4x1 py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
            consequatur! Facilis harum veritatis fuga, doloremque, eaque
            exercitationem cupiditate facere eveniet, explicabo nobis
            perferendis nulla eum aliquid nostrum rerum ipsam delectus?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
            consequatur! Facilis harum veritatis fuga, doloremque, eaque
            exercitationem cupiditate facere eveniet, explicabo nobis
            perferendis nulla eum aliquid nostrum rerum ipsam delectus?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exeptional Customer Services:</b>
          <p className="text-gray-600 text-start">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
            consequatur! Facilis harum veritatis fuga, doloremque, eaque
            exercitationem cupiditate facere eveniet, explicabo nobis
            perferendis nulla eum aliquid nostrum rerum ipsam delectus?
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
