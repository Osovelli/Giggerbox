function TestimonialSection() {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Testimonial Content */}
            <div className="flex-1 space-y-4">
              {/* Quote Mark */}
              <div className="mb-6">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-500"
                >
                  <path
                    d="M14.016 27.534C14.016 25.182 13.266 23.406 11.766 22.206C10.266 21.006 8.19 20.406 5.538 20.406V15.75C9.588 15.75 12.726 16.848 14.952 19.044C17.178 21.24 18.291 24.264 18.291 28.116V42H5.916V28.116L14.016 27.534ZM35.016 27.534C35.016 25.182 34.266 23.406 32.766 22.206C31.266 21.006 29.19 20.406 26.538 20.406V15.75C30.588 15.75 33.726 16.848 35.952 19.044C38.178 21.24 39.291 24.264 39.291 28.116V42H26.916V28.116L35.016 27.534Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
  
              {/* Quote Text */}
              <blockquote className="text-3xl md:text-4xl font-medium leading-relaxed">
                Giggerz is so easy to use. We've hired about 40-50 different people on Giggerz in the past two years.
              </blockquote>
  
              {/* Author Info */}
              <div className="pt-4">
                <p className="font-semibold">Name here</p>
                <p className="text-muted-foreground">Company's name</p>
              </div>
            </div>
  
            {/* Profile Image */}
            <div className="md:w-80 md:flex-shrink-0">
              <img
                src="/Bitmap.png"
                alt="Testimonial profile"
                className="w-48 h-48 md:w-80 md:h-80 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default TestimonialSection
  
  