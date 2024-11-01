﻿// <auto-generated />
using System;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241101092308_NewCreate2")]
    partial class NewCreate2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Backend.Models.Department", b =>
                {
                    b.Property<string>("departmentId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("departmentLocation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("departmentName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("departmentId");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("Backend.Models.Employee", b =>
                {
                    b.Property<string>("employeeId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("age")
                        .HasColumnType("int");

                    b.Property<DateTime>("dateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("departmentId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("firstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("lastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("salary")
                        .HasColumnType("float");

                    b.HasKey("employeeId");

                    b.HasIndex("departmentId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("Backend.Models.Employee", b =>
                {
                    b.HasOne("Backend.Models.Department", "department")
                        .WithMany()
                        .HasForeignKey("departmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("department");
                });
#pragma warning restore 612, 618
        }
    }
}
